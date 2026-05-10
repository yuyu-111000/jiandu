"""init schema (MySQL)

Revision ID: 001
Revises:
Create Date: 2026-05-09
"""
from alembic import op
import sqlalchemy as sa

revision = "001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "source",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("author", sa.String(200)),
        sa.Column("publisher", sa.String(200)),
        sa.Column("description", sa.Text),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime, server_default=sa.func.now()),
    )

    op.create_table(
        "category",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("category_type", sa.String(50), nullable=False),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("sort_order", sa.Integer, default=0),
    )

    op.create_table(
        "catalog",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("source_id", sa.Integer, sa.ForeignKey("source.id"), nullable=False),
        sa.Column("parent_id", sa.Integer, sa.ForeignKey("catalog.id"), nullable=True),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("sort_order", sa.Integer, default=0),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime, server_default=sa.func.now()),
    )

    op.create_table(
        "page_image",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("source_id", sa.Integer, sa.ForeignKey("source.id"), nullable=False),
        sa.Column("catalog_id", sa.Integer, sa.ForeignKey("catalog.id"), nullable=True),
        sa.Column("page_number", sa.Integer, nullable=False),
        sa.Column("image_path", sa.String(1000)),
        sa.Column("sort_order", sa.Integer, default=0),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime, server_default=sa.func.now()),
    )

    op.create_table(
        "slip_item",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("code", sa.String(50), unique=True, nullable=False, index=True),
        sa.Column("title", sa.String(500)),
        sa.Column("text", sa.Text, nullable=False),
        sa.Column("period", sa.String(100), index=True),
        sa.Column("location", sa.String(200), index=True),
        sa.Column("source_id", sa.Integer, sa.ForeignKey("source.id"), nullable=True),
        sa.Column("case_type", sa.String(100), index=True),
        sa.Column("image_id", sa.Integer, sa.ForeignKey("page_image.id"), nullable=True),
        sa.Column("page_number", sa.Integer),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime, server_default=sa.func.now()),
    )

    op.create_table(
        "annotation",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("item_id", sa.Integer, sa.ForeignKey("slip_item.id"), nullable=False, index=True),
        sa.Column("annotation_type", sa.String(50)),
        sa.Column("word", sa.String(200)),
        sa.Column("pos", sa.String(20), index=True),
        sa.Column("role", sa.String(50), index=True),
        sa.Column("ref_target", sa.String(200)),
        sa.Column("start_pos", sa.Integer),
        sa.Column("end_pos", sa.Integer),
        sa.Column("created_at", sa.DateTime, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime, server_default=sa.func.now()),
    )


def downgrade():
    op.drop_table("annotation")
    op.drop_table("slip_item")
    op.drop_table("page_image")
    op.drop_table("catalog")
    op.drop_table("category")
    op.drop_table("source")
