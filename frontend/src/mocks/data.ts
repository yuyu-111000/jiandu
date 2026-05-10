export interface Annotation {
  id: number
  type: 'syntax' | 'reference'
  word: string
  pos: string
  role: string
  startPos: number
  endPos: number
}

export interface SlipItem {
  id: number
  code: string
  title: string
  text: string
  period: string
  location: string
  source: string
  caseType: string
  pageNumber: number
  imageId: number
  annotations: Annotation[]
}

export interface Catalog {
  id: number
  title: string
  children?: Catalog[]
  items?: { id: number; code: string; title: string; page: number }[]
}

export const catalogs: Catalog[] = [
  {
    id: 1,
    title: '睡虎地秦墓竹简',
    children: [
      {
        id: 11,
        title: '法律答问',
        items: [
          { id: 1, code: 'J-025', title: '盗牛案', page: 12 },
          { id: 2, code: 'J-026', title: '群盗案', page: 14 },
          { id: 3, code: 'J-027', title: '贼伤案', page: 21 },
        ],
      },
      {
        id: 12,
        title: '封诊式',
        items: [
          { id: 4, code: 'J-041', title: '讯狱案', page: 31 },
          { id: 5, code: 'J-042', title: '亡人案', page: 45 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: '张家山汉墓竹简',
    children: [
      {
        id: 21,
        title: '二年律令',
        items: [
          { id: 6, code: 'J-058', title: '贼律·伤人案', page: 8 },
          { id: 7, code: 'J-059', title: '盗律·窃金案', page: 15 },
        ],
      },
      {
        id: 22,
        title: '奏谳书',
        items: [
          { id: 8, code: 'J-072', title: '女子和奸案', page: 52 },
        ],
      },
    ],
  },
]

export const slipItems: SlipItem[] = [
  {
    id: 1,
    code: 'J-025',
    title: '盗牛案',
    text: '某甲盗牛，吏捕得之。令史案验，其辞与证相合。当以律论，具书其狱。',
    period: '秦',
    location: '睡虎地',
    source: '睡虎地秦墓竹简·法律答问',
    caseType: '盗',
    pageNumber: 12,
    imageId: 1,
    annotations: [
      { id: 1, type: 'syntax', word: '某甲', pos: 'n', role: 'subject', startPos: 0, endPos: 2 },
      { id: 2, type: 'syntax', word: '盗', pos: 'v', role: 'predicate', startPos: 2, endPos: 3 },
      { id: 3, type: 'syntax', word: '牛', pos: 'n', role: 'object', startPos: 3, endPos: 4 },
      { id: 4, type: 'syntax', word: '吏', pos: 'n', role: 'subject', startPos: 6, endPos: 7 },
      { id: 5, type: 'syntax', word: '捕', pos: 'v', role: 'predicate', startPos: 7, endPos: 8 },
      { id: 6, type: 'reference', word: '某甲', pos: '', role: '', startPos: 0, endPos: 2 },
    ],
  },
  {
    id: 2,
    code: 'J-026',
    title: '群盗案',
    text: '某里五人共盗，吏逐捕之，得三人，二人亡。讯其辞，各以状对。',
    period: '秦',
    location: '睡虎地',
    source: '睡虎地秦墓竹简·法律答问',
    caseType: '群盗',
    pageNumber: 14,
    imageId: 2,
    annotations: [
      { id: 7, type: 'syntax', word: '五人', pos: 'n', role: 'subject', startPos: 3, endPos: 5 },
      { id: 8, type: 'syntax', word: '盗', pos: 'v', role: 'predicate', startPos: 6, endPos: 7 },
      { id: 9, type: 'syntax', word: '吏', pos: 'n', role: 'subject', startPos: 8, endPos: 9 },
      { id: 10, type: 'syntax', word: '捕', pos: 'v', role: 'predicate', startPos: 10, endPos: 11 },
    ],
  },
  {
    id: 3,
    code: 'J-027',
    title: '贼伤案',
    text: '某甲以刃贼伤某乙，吏捕得甲。讯问，甲辞曰：乙先詈我，我怒而伤之。',
    period: '秦',
    location: '睡虎地',
    source: '睡虎地秦墓竹简·法律答问',
    caseType: '贼伤',
    pageNumber: 21,
    imageId: 3,
    annotations: [
      { id: 11, type: 'syntax', word: '某甲', pos: 'n', role: 'subject', startPos: 0, endPos: 2 },
      { id: 12, type: 'syntax', word: '伤', pos: 'v', role: 'predicate', startPos: 6, endPos: 7 },
      { id: 13, type: 'syntax', word: '某乙', pos: 'n', role: 'object', startPos: 7, endPos: 9 },
      { id: 14, type: 'syntax', word: '吏', pos: 'n', role: 'subject', startPos: 10, endPos: 11 },
      { id: 15, type: 'syntax', word: '捕', pos: 'v', role: 'predicate', startPos: 11, endPos: 12 },
    ],
  },
  {
    id: 4,
    code: 'J-041',
    title: '讯狱案',
    text: '某里人有盗，辞不服，复讯之。吏以律诘问，终得其情。',
    period: '秦',
    location: '睡虎地',
    source: '睡虎地秦墓竹简·封诊式',
    caseType: '盗',
    pageNumber: 31,
    imageId: 4,
    annotations: [
      { id: 16, type: 'syntax', word: '人', pos: 'n', role: 'subject', startPos: 3, endPos: 4 },
      { id: 17, type: 'syntax', word: '盗', pos: 'v', role: 'predicate', startPos: 5, endPos: 6 },
      { id: 18, type: 'syntax', word: '吏', pos: 'n', role: 'subject', startPos: 12, endPos: 13 },
    ],
  },
  {
    id: 5,
    code: 'J-042',
    title: '亡人案',
    text: '隶臣某亡，吏逐捕得之。讯问亡故，辞曰：不堪其役，故亡。',
    period: '秦',
    location: '睡虎地',
    source: '睡虎地秦墓竹简·封诊式',
    caseType: '亡',
    pageNumber: 45,
    imageId: 5,
    annotations: [
      { id: 19, type: 'syntax', word: '隶臣', pos: 'n', role: 'subject', startPos: 0, endPos: 2 },
      { id: 20, type: 'syntax', word: '亡', pos: 'v', role: 'predicate', startPos: 3, endPos: 4 },
      { id: 21, type: 'syntax', word: '吏', pos: 'n', role: 'subject', startPos: 5, endPos: 6 },
      { id: 22, type: 'syntax', word: '捕', pos: 'v', role: 'predicate', startPos: 8, endPos: 9 },
    ],
  },
  {
    id: 6,
    code: 'J-058',
    title: '贼律·伤人案',
    text: '贼伤人，及自贼伤以避事者，皆黥为城旦舂。',
    period: '汉',
    location: '张家山',
    source: '张家山汉墓竹简·二年律令',
    caseType: '贼伤',
    pageNumber: 8,
    imageId: 6,
    annotations: [
      { id: 23, type: 'syntax', word: '贼', pos: 'n', role: 'subject', startPos: 0, endPos: 1 },
      { id: 24, type: 'syntax', word: '伤', pos: 'v', role: 'predicate', startPos: 1, endPos: 2 },
      { id: 25, type: 'reference', word: '城旦舂', pos: '', role: '', startPos: 18, endPos: 21 },
    ],
  },
  {
    id: 7,
    code: 'J-059',
    title: '盗律·窃金案',
    text: '盗铸钱，及佐者，弃市。同居不告，赎耐。',
    period: '汉',
    location: '张家山',
    source: '张家山汉墓竹简·二年律令',
    caseType: '盗',
    pageNumber: 15,
    imageId: 7,
    annotations: [
      { id: 26, type: 'syntax', word: '盗', pos: 'v', role: 'predicate', startPos: 0, endPos: 1 },
      { id: 27, type: 'reference', word: '弃市', pos: '', role: '', startPos: 10, endPos: 12 },
      { id: 28, type: 'reference', word: '赎耐', pos: '', role: '', startPos: 17, endPos: 19 },
    ],
  },
  {
    id: 8,
    code: 'J-072',
    title: '女子和奸案',
    text: '女子甲为人妻，与男子乙和奸。其夫告，吏捕得之。',
    period: '汉',
    location: '张家山',
    source: '张家山汉墓竹简·奏谳书',
    caseType: '和奸',
    pageNumber: 52,
    imageId: 8,
    annotations: [
      { id: 29, type: 'syntax', word: '女子甲', pos: 'n', role: 'subject', startPos: 0, endPos: 3 },
      { id: 30, type: 'syntax', word: '男子乙', pos: 'n', role: 'object', startPos: 9, endPos: 12 },
      { id: 31, type: 'syntax', word: '吏', pos: 'n', role: 'subject', startPos: 17, endPos: 18 },
      { id: 32, type: 'syntax', word: '捕', pos: 'v', role: 'predicate', startPos: 18, endPos: 19 },
    ],
  },
]

export const periodOptions = [
  { value: '秦', label: '秦', count: 5 },
  { value: '汉', label: '汉', count: 3 },
  { value: '战国', label: '战国', count: 0 },
]

export const locationOptions = [
  { value: '睡虎地', label: '睡虎地秦简', count: 5 },
  { value: '张家山', label: '张家山汉简', count: 3 },
  { value: '里耶', label: '里耶秦简', count: 0 },
  { value: '岳麓', label: '岳麓秦简', count: 0 },
]

export const caseTypeOptions = [
  { value: '法律案例', label: '法律案例', count: 8 },
  { value: '律令条文', label: '律令条文', count: 0 },
]

export function getItemById(id: number): SlipItem | undefined {
  return slipItems.find(item => item.id === id)
}

export function searchItems(query: string, filters: { locations: string[]; periods: string[] }): SlipItem[] {
  return slipItems.filter(item => {
    if (query && !item.text.includes(query) && !item.title.includes(query) && !item.code.includes(query)) {
      return false
    }
    if (filters.locations.length > 0 && !filters.locations.includes(item.location)) {
      return false
    }
    if (filters.periods.length > 0 && !filters.periods.includes(item.period)) {
      return false
    }
    return true
  })
}

export function getStats() {
  return {
    totalItems: slipItems.length,
    totalSources: [...new Set(slipItems.map(i => i.source))].length,
    totalAnnotations: slipItems.reduce((sum, i) => sum + i.annotations.length, 0),
    totalLocations: [...new Set(slipItems.map(i => i.location))].length,
  }
}
