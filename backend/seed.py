"""
Seed script — populates DB with sample data matching frontend mocks.
Run: python -m backend.seed
"""
import asyncio
from sqlalchemy import select
from app.database import async_session
from app.models.source import Source
from app.models.catalog import Catalog
from app.models.slip_item import SlipItem
from app.models.annotation import Annotation
from app.models.category import Category

ANNOTATIONS = [
    # J-025 盗牛案
    {"item_id": 1, "annotation_type": "syntax", "word": "某甲", "pos": "n", "role": "subject", "start_pos": 0, "end_pos": 2},
    {"item_id": 1, "annotation_type": "syntax", "word": "盗", "pos": "v", "role": "predicate", "start_pos": 2, "end_pos": 3},
    {"item_id": 1, "annotation_type": "syntax", "word": "牛", "pos": "n", "role": "object", "start_pos": 3, "end_pos": 4},
    {"item_id": 1, "annotation_type": "syntax", "word": "吏", "pos": "n", "role": "subject", "start_pos": 6, "end_pos": 7},
    {"item_id": 1, "annotation_type": "syntax", "word": "捕", "pos": "v", "role": "predicate", "start_pos": 7, "end_pos": 8},
    # J-026 群盗案
    {"item_id": 2, "annotation_type": "syntax", "word": "五人", "pos": "n", "role": "subject", "start_pos": 3, "end_pos": 5},
    {"item_id": 2, "annotation_type": "syntax", "word": "盗", "pos": "v", "role": "predicate", "start_pos": 6, "end_pos": 7},
    # J-027 贼伤案
    {"item_id": 3, "annotation_type": "syntax", "word": "某甲", "pos": "n", "role": "subject", "start_pos": 0, "end_pos": 2},
    {"item_id": 3, "annotation_type": "syntax", "word": "伤", "pos": "v", "role": "predicate", "start_pos": 6, "end_pos": 7},
    # J-041
    {"item_id": 4, "annotation_type": "syntax", "word": "人", "pos": "n", "role": "subject", "start_pos": 3, "end_pos": 4},
    {"item_id": 4, "annotation_type": "syntax", "word": "盗", "pos": "v", "role": "predicate", "start_pos": 5, "end_pos": 6},
    # J-042
    {"item_id": 5, "annotation_type": "syntax", "word": "隶臣", "pos": "n", "role": "subject", "start_pos": 0, "end_pos": 2},
    {"item_id": 5, "annotation_type": "syntax", "word": "亡", "pos": "v", "role": "predicate", "start_pos": 3, "end_pos": 4},
    # J-058
    {"item_id": 6, "annotation_type": "syntax", "word": "贼", "pos": "n", "role": "subject", "start_pos": 0, "end_pos": 1},
    {"item_id": 6, "annotation_type": "syntax", "word": "伤", "pos": "v", "role": "predicate", "start_pos": 1, "end_pos": 2},
    # J-059
    {"item_id": 7, "annotation_type": "syntax", "word": "盗", "pos": "v", "role": "predicate", "start_pos": 0, "end_pos": 1},
    # J-072
    {"item_id": 8, "annotation_type": "syntax", "word": "女子甲", "pos": "n", "role": "subject", "start_pos": 0, "end_pos": 3},
    {"item_id": 8, "annotation_type": "syntax", "word": "男子乙", "pos": "n", "role": "object", "start_pos": 9, "end_pos": 12},
]

SLIPS = [
    {"code": "J-025", "title": "盗牛案", "text": "某甲盗牛，吏捕得之。令史案验，其辞与证相合。当以律论，具书其狱。", "period": "秦", "location": "睡虎地", "case_type": "盗", "page_number": 12},
    {"code": "J-026", "title": "群盗案", "text": "某里五人共盗，吏逐捕之，得三人，二人亡。讯其辞，各以状对。", "period": "秦", "location": "睡虎地", "case_type": "群盗", "page_number": 14},
    {"code": "J-027", "title": "贼伤案", "text": "某甲以刃贼伤某乙，吏捕得甲。讯问，甲辞曰：乙先詈我，我怒而伤之。", "period": "秦", "location": "睡虎地", "case_type": "贼伤", "page_number": 21},
    {"code": "J-041", "title": "讯狱案", "text": "某里人有盗，辞不服，复讯之。吏以律诘问，终得其情。", "period": "秦", "location": "睡虎地", "case_type": "盗", "page_number": 31},
    {"code": "J-042", "title": "亡人案", "text": "隶臣某亡，吏逐捕得之。讯问亡故，辞曰：不堪其役，故亡。", "period": "秦", "location": "睡虎地", "case_type": "亡", "page_number": 45},
    {"code": "J-058", "title": "贼律·伤人案", "text": "贼伤人，及自贼伤以避事者，皆黥为城旦舂。", "period": "汉", "location": "张家山", "case_type": "贼伤", "page_number": 8},
    {"code": "J-059", "title": "盗律·窃金案", "text": "盗铸钱，及佐者，弃市。同居不告，赎耐。", "period": "汉", "location": "张家山", "case_type": "盗", "page_number": 15},
    {"code": "J-072", "title": "女子和奸案", "text": "女子甲为人妻，与男子乙和奸。其夫告，吏捕得之。", "period": "汉", "location": "张家山", "case_type": "和奸", "page_number": 52},
]

CATEGORIES = [
    {"category_type": "period", "name": "秦", "sort_order": 1},
    {"category_type": "period", "name": "汉", "sort_order": 2},
    {"category_type": "period", "name": "战国", "sort_order": 3},
    {"category_type": "location", "name": "睡虎地", "sort_order": 1},
    {"category_type": "location", "name": "张家山", "sort_order": 2},
    {"category_type": "location", "name": "里耶", "sort_order": 3},
    {"category_type": "location", "name": "岳麓", "sort_order": 4},
    {"category_type": "case_type", "name": "盗", "sort_order": 1},
    {"category_type": "case_type", "name": "贼伤", "sort_order": 2},
    {"category_type": "case_type", "name": "群盗", "sort_order": 3},
    {"category_type": "case_type", "name": "亡", "sort_order": 4},
    {"category_type": "case_type", "name": "和奸", "sort_order": 5},
]


async def seed():
    async with async_session() as db:
        # Check if already seeded
        result = await db.execute(select(SlipItem).limit(1))
        if result.scalar_one_or_none():
            print("Database already seeded. Skipping.")
            return

        # Sources
        src1 = Source(title="睡虎地秦墓竹简", author="睡虎地秦墓竹简整理小组", publisher="文物出版社", description="1975年湖北云梦睡虎地11号秦墓出土竹简")
        src2 = Source(title="张家山汉墓竹简", author="张家山汉墓竹简整理小组", publisher="文物出版社", description="1983年湖北江陵张家山247号汉墓出土竹简")
        db.add_all([src1, src2])
        await db.flush()

        # Catalogs
        cat1 = Catalog(source_id=src1.id, title="法律答问", sort_order=1)
        cat2 = Catalog(source_id=src1.id, title="封诊式", sort_order=2)
        cat3 = Catalog(source_id=src2.id, title="二年律令", sort_order=1)
        cat4 = Catalog(source_id=src2.id, title="奏谳书", sort_order=2)
        db.add_all([cat1, cat2, cat3, cat4])
        await db.flush()

        # Slip items
        for i, s in enumerate(SLIPS):
            source_id = src1.id if s["period"] == "秦" else src2.id
            item = SlipItem(**s, source_id=source_id)
            db.add(item)
            await db.flush()
            # Add annotations
            for ann in ANNOTATIONS:
                if ann["item_id"] == i + 1:
                    db.add(Annotation(**ann))

        # Categories
        for cat in CATEGORIES:
            db.add(Category(**cat))

        await db.commit()
        print(f"Seeded: {len(SLIPS)} slip items, {len(ANNOTATIONS)} annotations, {len(CATEGORIES)} categories")


if __name__ == "__main__":
    asyncio.run(seed())
