export type TermCategory =
  | '전력수요·예비력'
  | '전력시장·거래'
  | '계통·송배전'
  | '신재생·탄소중립';

export type DifficultyLevel = '기초' | '중급' | '실무';

export interface PowerTerm {
  id: string;
  termKr: string;
  termEn: string;
  acronym?: string;
  category: TermCategory;
  difficulty: DifficultyLevel;
  summary: string;
  detailedExplanation: string;
  newsContext: string;
  highlightPhrases: string[];
  unitOrBenchmark?: string;
  source: string;
  aliases: string[];
  relatedTermIds: string[];
}

export interface QuizOption {
  id: string;
  label: string;
  wrongReason?: string;
}

export interface QuizVisualMeter {
  title: string;
  statusLabel: string;
  demandPercent: number;
  reservePercent: number;
  leftCaption: string;
  rightCaption: string;
}

export interface QuizQuestion {
  id: string;
  termId: string;
  termLabel: string;
  category: TermCategory;
  difficulty: DifficultyLevel;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  correctExplanation: string;
  highlightPhrase?: string;
  nextPreviewTitle?: string;
  sourceLabel: string;
  visualMeter?: QuizVisualMeter;
}

export interface QuizTrack {
  id: string;
  title: string;
  subtitle: string;
  badgeLabel: string;
  questionIds: string[];
}

export interface NewsSample {
  id: string;
  title: string;
  source: string;
  date: string;
  body: string;
}

export interface WrongNoteEntry {
  termId: string;
  questionId: string;
  selectedOptionLabel: string;
  wrongReason: string;
  savedAt: string;
  reviewCount: number;
}

export const TERM_CATEGORIES: TermCategory[] = [
  '전력수요·예비력',
  '전력시장·거래',
  '계통·송배전',
  '신재생·탄소중립',
];

export const POWER_TERMS: PowerTerm[] = [
  {
    id: 'reserve-margin',
    termKr: '공급예비율',
    termEn: 'Reserve Margin',
    acronym: '예비율',
    category: '전력수요·예비력',
    difficulty: '기초',
    summary:
      '공급능력에서 현재 전력수요(또는 최대전력)를 뺀 공급예비력을 전력수요로 나눈 백분율로, 전력계통 안정성의 핵심 안전판입니다.',
    detailedExplanation:
      '공급예비율은 발전기 불시 고장이나 폭염·한파 등 이상기후로 인한 급격한 전력수요 폭증에 대비해 확보하는 설비 여유분 지표입니다. 통상 안정적인 계통 운영을 위해 10% 이상 유지를 권장하며, 예비력이 일정 기준 이하로 내려가면 전력수급경보 단계(준비·관심·주의·경계·심각)가 순차 발령됩니다.',
    newsContext:
      '산업통상자원부는 올여름 최대전력 수요가 97.2GW까지 치솟더라도 공급능력 106.4GW를 확보해 공급예비율 10% 안팎의 안정적인 전력수급을 유지하겠다고 밝혔다.',
    highlightPhrases: ['공급예비율', '공급능력', '최대전력 수요'],
    unitOrBenchmark: '권장선 10% 이상',
    source: '한국전력공사 및 전력거래소 용어 표준',
    aliases: ['공급예비율', '공급예비력', '예비율', 'Reserve Margin'],
    relatedTermIds: ['demand-response', 'peak-load', 'pumped-storage'],
  },
  {
    id: 'demand-response',
    termKr: '수요반응',
    termEn: 'Demand Response',
    acronym: 'DR',
    category: '전력수요·예비력',
    difficulty: '기초',
    summary:
      '전력 피크 시간대나 계통 위기 시 전기 사용자가 자발적으로 전력 소비를 줄이고 그 대가로 금전적 보상을 받는 제도입니다.',
    detailedExplanation:
      '발전소를 추가로 짓지 않고도 피크타임 전력 부하를 낮출 수 있어 "아낀 전기를 파는 시장(네가와트 시장)"이라고 불립니다. 전력거래소의 감축 지시(급전지시)에 따라 공장이나 대형 빌딩이 설비 가동을 조정하면 정산금을 받게 됩니다.',
    newsContext:
      '전력거래소는 여름철 오후 피크타임 수급 안정을 위해 산업체 참여형 수요반응(DR) 자원을 발동해 1시간 만에 2.1GW 규모의 전력 부하를 감축했다.',
    highlightPhrases: ['수요반응(DR)', '피크타임', '전력 부하'],
    unitOrBenchmark: '감축 단위: MW / kWh',
    source: '전력거래소 수요자원거래시장 운영규칙',
    aliases: ['수요반응', 'DR', '수요자원', '피크감축', '네가와트'],
    relatedTermIds: ['reserve-margin', 'peak-load'],
  },
  {
    id: 'smp',
    termKr: '계통한계가격',
    termEn: 'System Marginal Price',
    acronym: 'SMP',
    category: '전력시장·거래',
    difficulty: '기초',
    summary:
      '전력거래소에서 거래되는 전력의 시간대별 도매가격으로, 해당 시간 수요를 충족하기 위해 가동된 발전기 중 변동비가 가장 높은 발전기의 발전단가로 결정됩니다.',
    detailedExplanation:
      '우리나라 전력도매시장은 변동비가 낮은 원자력·석탄 발전기부터 순서대로 가동(경제급전)하고, 마지막에 투입된 한계발전기(주로 LNG 복합화력)의 연료비 단가가 그 시간대의 SMP가 됩니다. 국제 천연가스(LNG) 가격이 오르면 SMP도 함께 상승합니다.',
    newsContext:
      '국제 액화천연가스(LNG) 도입 단가 안정세에 힘입어 이번 달 육지 기준 평균 계통한계가격(SMP)이 1kWh당 130원대 초반으로 내려왔다.',
    highlightPhrases: ['계통한계가격(SMP)', '1kWh당 130원대'],
    unitOrBenchmark: '단위: 원/kWh',
    source: '전력거래소 전력시장운영규칙',
    aliases: ['계통한계가격', 'SMP', '전력도매가격', '한계가격'],
    relatedTermIds: ['rec', 'baseload', 'ppa'],
  },
  {
    id: 'rps',
    termKr: '신재생에너지 공급의무화',
    termEn: 'Renewable Portfolio Standard',
    acronym: 'RPS',
    category: '신재생·탄소중립',
    difficulty: '기초',
    summary:
      '일정 규모(500MW) 이상의 발전설비를 보유한 발전사업자에게 총 발전량의 일정 비율 이상을 신재생에너지로 공급하도록 의무화한 제도입니다.',
    detailedExplanation:
      '한국수력원자력이나 발전 공기업 등 공급의무자는 자체 신재생 설비를 짓거나, 외부 신재생 발전사업자로부터 공급인증서(REC)를 구매해 연간 의무 공급 비율을 채워야 합니다.',
    newsContext:
      '정부는 신재생에너지 공급의무화(RPS) 의무 비율 상향 속도를 조정하는 한편, 경매 중심의 장기계약 비중을 높여 시장 예측 가능성을 강화하기로 했다.',
    highlightPhrases: ['신재생에너지 공급의무화(RPS)', '장기계약'],
    unitOrBenchmark: '의무대상: 500MW 이상 발전사',
    source: '한국에너지공단 신재생에너지센터',
    aliases: ['신재생에너지공급의무화', '신재생에너지 공급의무화', 'RPS', '공급의무화'],
    relatedTermIds: ['rec', 'ppa', 'curtailment'],
  },
  {
    id: 'baseload',
    termKr: '기저발전량',
    termEn: 'Base Load Generation',
    acronym: '기저발전',
    category: '계통·송배전',
    difficulty: '기초',
    summary:
      '하루 24시간 중 최저 수요 수준을 담당하며 연료비가 저렴해 연중 대부분 일정한 출력으로 가동되는 발전원(원자력·석탄 등)의 발전량입니다.',
    detailedExplanation:
      '전력 수요는 시간에 따라 오르내리지만 항상 유지되는 최소한의 바닥 수요(기저부하)가 존재합니다. 원자력이나 석탄화력은 출력 변동이 느린 대신 연료비(변동비)가 싸기 때문에 기저발전으로 먼저 투입되고, 변동을 따라가는 역할은 LNG나 양수발전이 맡습니다.',
    newsContext:
      '봄철 경부하기에는 냉난방 수요가 줄어들어 기저발전량 비중이 상대적으로 높아지면서 재생에너지와의 계통 수용 균형 관리가 중요해진다.',
    highlightPhrases: ['기저발전량', '경부하기', '계통 수용'],
    unitOrBenchmark: '대표 전원: 원자력·석탄',
    source: '한국전력공사 전력용어집',
    aliases: ['기저발전량', '기저발전', '기저부하', 'Base Load'],
    relatedTermIds: ['peak-load', 'smp', 'curtailment'],
  },
  {
    id: 'rec',
    termKr: '신재생에너지 공급인증서',
    termEn: 'Renewable Energy Certificate',
    acronym: 'REC',
    category: '전력시장·거래',
    difficulty: '기초',
    summary:
      '신재생에너지 설비를 통해 전력을 1MWh 생산·공급했음을 증명하는 인증서로, 발전사업자의 핵심 부가 수익원입니다.',
    detailedExplanation:
      '신재생 발전사업자는 전력을 판매해 SMP 수익을 얻는 동시에, 발급받은 REC를 현물시장이나 장기계약을 통해 공급의무자(RPS 대상)에게 판매해 추가 수익을 얻습니다. 설비 유형과 입지별로 가중치(예: 0.8~1.5배 등)가 다르게 적용됩니다.',
    newsContext:
      '태양광·풍력 발전사업자의 수익을 좌우하는 SMP+REC 합산 단가가 최근 현물시장 거래량 증가와 함께 강보합세를 유지하고 있다.',
    highlightPhrases: ['REC', 'SMP', '현물시장'],
    unitOrBenchmark: '발급 기준: 1MWh × 가중치',
    source: '한국에너지공단 RPS 운영규칙',
    aliases: ['공급인증서', 'REC', '신재생에너지 공급인증서'],
    relatedTermIds: ['rps', 'smp', 'ppa'],
  },
  {
    id: 'peak-load',
    termKr: '첨두부하',
    termEn: 'Peak Load',
    acronym: '피크부하',
    category: '전력수요·예비력',
    difficulty: '기초',
    summary:
      '하루 또는 특정 계절 동안 전력 소비가 가장 높게 치솟는 시간대의 전력 수요(최대부하)를 뜻합니다.',
    detailedExplanation:
      '일반적으로 한여름 오후 냉방 수요나 한겨울 오전 난방 수요가 몰릴 때 첨두부하가 발생합니다. 이 순간에도 정전이 나지 않도록 가동 속도가 빠른 LNG 발전기, 양수발전, 수요반응(DR) 자원 등을 동원해 대응합니다.',
    newsContext:
      '폭염 특보가 전국으로 확대되면서 오후 4시 기준 첨두부하가 역대 7월 최고치를 경신했고, 전력당국은 양수발전기를 전면 가동했다.',
    highlightPhrases: ['첨두부하', '양수발전기'],
    unitOrBenchmark: '단위: GW / MW',
    source: '전력거래소 계통운영 기준',
    aliases: ['첨두부하', '피크부하', '피크타임', '최대전력', 'Peak Load'],
    relatedTermIds: ['reserve-margin', 'demand-response', 'pumped-storage'],
  },
  {
    id: 'pumped-storage',
    termKr: '양수발전',
    termEn: 'Pumped-storage Hydroelectricity',
    acronym: '양수',
    category: '계통·송배전',
    difficulty: '중급',
    summary:
      '전력이 남는 시간대에 하부 댐의 물을 상부 댐으로 퍼 올려 저장했다가, 전력이 부족할 때 낙하시켜 발전하는 대규모 에너지 저장 설비입니다.',
    detailedExplanation:
      '양수발전은 가동 지시 후 수 분 이내에 최대 출력까지 올릴 수 있는 뛰어난 속응성을 지닙니다. 최근에는 태양광 발전이 넘치는 낮 시간대에 물을 퍼 올려 재생에너지 출력제어를 완화하는 "거대한 친환경 물 배터리" 역할로 주목받고 있습니다.',
    newsContext:
      '낮 시간대 태양광 잉여 전력을 흡수하고 저녁 피크 시간대에 빠르게 전력을 공급하기 위해 신규 양수발전소 건설 사업이 속도를 내고 있다.',
    highlightPhrases: ['양수발전소', '잉여 전력', '저녁 피크'],
    unitOrBenchmark: '기동 시간: 약 3~5분',
    source: '한국수력원자력 발전기술 자료',
    aliases: ['양수발전', '양수발전소', '양수발전기', 'Pumped-storage'],
    relatedTermIds: ['curtailment', 'peak-load', 'fr-ess'],
  },
  {
    id: 'curtailment',
    termKr: '출력제어',
    termEn: 'Curtailment',
    acronym: '출력제한',
    category: '신재생·탄소중립',
    difficulty: '중급',
    summary:
      '전력 공급이 수요와 송전망 수용 한계를 초과할 때, 계통 주파수 안정과 설비 보호를 위해 발전기의 발전을 인위적으로 낮추거나 정지시키는 조치입니다.',
    detailedExplanation:
      '재생에너지 비중이 높은 제주나 호남 지역에서 전력 수요가 적은 봄·가을 낮 시간에 태양광·풍력 발전량이 급증하면 과전압이나 주파수 상승 위험이 커집니다. 이때 계통 붕괴를 막기 위해 불가피하게 출력제어가 시행되며, 이를 줄이기 위해 ESS·계통보강·유연성 자원이 확대되고 있습니다.',
    newsContext:
      '주말 낮 시간대 전력 수요 감소와 쾌청한 날씨가 겹치면서 호남과 제주 계통의 안정성 확보를 위한 재생에너지 출력제어 횟수가 늘어나고 있다.',
    highlightPhrases: ['출력제어', '계통의 안정성'],
    unitOrBenchmark: '발생 조건: 경부하기·송전제약',
    source: '전력거래소 계통운영 보고서',
    aliases: ['출력제어', '출력제한', 'Curtailment', '경부하기'],
    relatedTermIds: ['islanded-grid', 'transmission-congestion', 'pumped-storage'],
  },
  {
    id: 'islanded-grid',
    termKr: '계통섬',
    termEn: 'Islanded Grid / 독립계통',
    acronym: '독립계통',
    category: '계통·송배전',
    difficulty: '실무',
    summary:
      '고장이나 송전선로 차단 등으로 육지 중앙 전력망과 분리되어 자체 발전원만으로 주파수와 전압을 유지해야 하는 고립된 전력 계통 상태입니다.',
    detailedExplanation:
      '대규모 육지 계통과 연결되어 있을 때는 외부에서 부족한 전력을 끌어오거나 남는 전력을 보낼 수 있지만, 계통섬 상태가 되면 구역 내 수요와 공급을 실시간으로 완벽히 맞춰야 하므로 주파수 변동 폭이 커지고 정전 위험이 급격히 높아집니다. 도서 지역이나 마이크로그리드 독립운전에서도 쓰이는 개념입니다.',
    newsContext:
      '초고압 직류송전(HVDC) 연계선로 점검 중 돌발 부하가 발생할 경우 일부 지역이 일시적인 계통섬 상태로 전환될 수 있어 보호계전 협조가 필수적이다.',
    highlightPhrases: ['계통섬', 'HVDC', '보호계전'],
    unitOrBenchmark: '기준 주파수: 60Hz (±0.2Hz)',
    source: '한국전력공사 송변전 실무 지침',
    aliases: ['계통섬', '독립계통', 'Islanded Grid', '단독계통'],
    relatedTermIds: ['fr-ess', 'curtailment', 'transmission-congestion'],
  },
  {
    id: 'ppa',
    termKr: '전력직접거래',
    termEn: 'Power Purchase Agreement',
    acronym: 'PPA',
    category: '전력시장·거래',
    difficulty: '중급',
    summary:
      '전기 사용자가 한국전력(전력시장)을 거치지 않고 재생에너지 발전사업자로부터 직접 전력을 장기 계약으로 구매하는 제도입니다.',
    detailedExplanation:
      'RE100 달성을 추진하는 국내외 기업들이 온실가스 감축 실적을 인정받기 위해 활용하는 핵심 수단입니다. 한전이 중개하는 제3자 PPA와 발전사업자·기업 간 직접 계약하는 직접 PPA 방식이 있으며, 망 이용요금(송배전망 사용료)은 별도로 정산합니다.',
    newsContext:
      '글로벌 수출 기업들이 RE100 이행 압박에 대응해 국내 태양광·풍력 발전단지와 20년 장기 직접 전력직접거래(PPA) 계약을 잇따라 체결하고 있다.',
    highlightPhrases: ['전력직접거래(PPA)', 'RE100'],
    unitOrBenchmark: '계약 기간: 통상 10~20년',
    source: '산업통상자원부 전기사업법 시행령',
    aliases: ['전력직접거래', 'PPA', '직접PPA', '제3자PPA', 'RE100'],
    relatedTermIds: ['rps', 'rec', 'smp'],
  },
  {
    id: 'fr-ess',
    termKr: '주파수조정용 ESS',
    termEn: 'Frequency Regulation ESS',
    acronym: 'FR ESS',
    category: '계통·송배전',
    difficulty: '실무',
    summary:
      '전력계통 주파수(국내 60Hz)가 수요·공급 불균형으로 흔들릴 때 밀리초 단위로 충·방전을 수행해 주파수를 즉각 안정시키는 에너지저장장치입니다.',
    detailedExplanation:
      '기존 화력발전기가 예비력을 확보하며 천천히 주파수를 맞추는 것보다 훨씬 빠른 응답 속도를 지닙니다. 수요가 급증해 주파수가 60Hz 아래로 떨어지면 즉시 방전해 전력을 보충하고, 공급이 넘쳐 주파수가 오르면 충전으로 잉여 전력을 흡수합니다.',
    newsContext:
      '변동성이 큰 재생에너지 확대에 따라 계통 관성을 보완하기 위해 주요 변전소에 대규모 계통안정화용·주파수조정용 ESS 구축이 확대되고 있다.',
    highlightPhrases: ['주파수조정용 ESS', '계통 관성', '변전소'],
    unitOrBenchmark: '응답속도: < 200ms (60Hz 유지)',
    source: '한국전력공사 계통계획처',
    aliases: ['주파수조정용 ESS', 'FR ESS', 'ESS', '에너지저장장치', '주파수'],
    relatedTermIds: ['islanded-grid', 'pumped-storage', 'transmission-congestion'],
  },
  {
    id: 'transmission-congestion',
    termKr: '송전제약',
    termEn: 'Transmission Congestion',
    acronym: '송전혼잡',
    category: '계통·송배전',
    difficulty: '실무',
    summary:
      '특정 구간의 송전선로 용량이 포화 상태에 이르러 발전 단가가 싼 발전소의 전력을 수요지까지 충분히 보내지 못하는 계통상의 제약 현상입니다.',
    detailedExplanation:
      '동해안이나 호남권처럼 발전설비가 밀집된 지역에서 수도권으로 전력을 실어 나르는 송전망이 부족할 때 발생합니다. 송전제약이 걸리면 값싼 발전기의 출력을 줄이고, 대신 수도권 인근의 비싼 발전기를 가동해야 해서 전력시장 비용(정산금)이 늘어날 수 있습니다.',
    newsContext:
      '동해안-수도권 송전선로 준공이 지연되면서 동해안 지역 원전과 화력발전기의 송전제약 문제가 전력계통의 주요 과제로 떠올랐다.',
    highlightPhrases: ['송전제약', '송전선로'],
    unitOrBenchmark: '핵심 원인: 발전-수요 지역 편중',
    source: '전력거래소 전력계통 운영 실무',
    aliases: ['송전제약', '송전혼잡', '송전망', '계통제약'],
    relatedTermIds: ['curtailment', 'baseload', 'distributed-energy'],
  },
  {
    id: 'basic-plan',
    termKr: '전력수급기본계획',
    termEn: 'Basic Plan for Long-term Electricity Supply and Demand',
    acronym: '전기본',
    category: '전력수요·예비력',
    difficulty: '중급',
    summary:
      '향후 15년간의 중장기 전력 수요 전망, 적정 설비예비율, 전원 구성(원전·재생·LNG 등) 및 송변전 설비 계획을 담은 국가 최상위 전력 계획입니다.',
    detailedExplanation:
      '전기사업법에 따라 산업통상자원부가 2년 주기로 수립하며, AI 데이터센터·반도체 클러스터 등 미래 전력 수요 증가 요인을 반영해 발전설비 투자와 계통 보강 로드맵을 확정합니다.',
    newsContext:
      '제11차 전력수급기본계획 실무안에는 용인 반도체 클러스터와 데이터센터 증설에 따른 장기 전력수요 급증 전망이 반영되었다.',
    highlightPhrases: ['전력수급기본계획', '장기 전력수요'],
    unitOrBenchmark: '계획 기간: 15년 / 수립 주기: 2년',
    source: '산업통상자원부 전력정책관실',
    aliases: ['전력수급기본계획', '전기본', '설비예비율'],
    relatedTermIds: ['reserve-margin', 'distributed-energy'],
  },
  {
    id: 'distributed-energy',
    termKr: '분산에너지',
    termEn: 'Distributed Energy Resources',
    acronym: 'DER',
    category: '신재생·탄소중립',
    difficulty: '중급',
    summary:
      '대규모 중앙집중형 발전소에서 장거리 송전망을 거쳐 전기를 보내는 대신, 전력을 사용하는 수요지 인근에서 소규모로 생산·소비하는 에너지 자원입니다.',
    detailedExplanation:
      '구역형 태양광, 연료전지, 소형모듈원전(SMR), 에너지저장장치(ESS), 통합발전소(VPP) 등이 포함됩니다. 분산에너지 활성화 특별법 시행으로 지역별 차등 전기요금제나 전력계통영향평가 제도 도입 기반이 마련되었습니다.',
    newsContext:
      '분산에너지 활성화 특별법이 본격 시행되면서 데이터센터 등 대규모 전력 소비 시설의 지방 분산과 지역 단위 전력 자급 모델이 주목받고 있다.',
    highlightPhrases: ['분산에너지', '전력 자급'],
    unitOrBenchmark: '대상 설비: 40MW 이하 발전·집단에너지 등',
    source: '산업통상자원부 분산에너지 활성화 특별법',
    aliases: ['분산에너지', '분산전원', 'DER', 'VPP', '통합발전소'],
    relatedTermIds: ['transmission-congestion', 'curtailment', 'ppa'],
  },
  {
    id: 'cfd',
    termKr: '차액계약',
    termEn: 'Contract for Difference',
    acronym: 'CfD',
    category: '전력시장·거래',
    difficulty: '실무',
    summary:
      '발전사업자와 구매자가 사전에 기준가격을 약정해 두고, 실제 전력시장가격(SMP)이 기준가격과 다를 때 그 차액을 사후 정산하는 가격 안정화 계약 방식입니다.',
    detailedExplanation:
      '시장가격이 급등할 때는 발전사가 초과 수익을 환수해 소비자 부담을 낮추고, 반대로 시장가격이 급락할 때는 발전사의 최소 수익을 보전해 장기 투자 불확실성을 줄여줍니다.',
    newsContext:
      '전력시장 도매가격의 급격한 등락을 완화하고 재생에너지 및 원전 정산 체계를 선진화하기 위해 정부승인 차액계약(CfD) 확대 방안이 논의되고 있다.',
    highlightPhrases: ['차액계약(CfD)', '도매가격'],
    unitOrBenchmark: '정산 구조: 기준가격 − 시장가격',
    source: '전력거래소 전력시장 선진화 자료',
    aliases: ['차액계약', 'CfD', '정부승인차액계약'],
    relatedTermIds: ['smp', 'ppa', 'rps'],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-reserve-margin',
    termId: 'reserve-margin',
    termLabel: '공급예비율',
    category: '전력수요·예비력',
    difficulty: '기초',
    question:
      '전력망에서 공급능력과 현재 전력수요의 차이를 나타내며, 전력 공급의 안정성을 측정하는 지표로 통상 10% 이상 유지를 권장하는 용어는 무엇일까요?',
    options: [
      {
        id: 'opt-smp',
        label: '계통한계가격 (SMP)',
        wrongReason:
          '계통한계가격(SMP)은 전력거래소에서 거래되는 전력의 도매 가격(원/kWh)을 의미하며, 발전기나 설비 여유 용량 마진 또는 전력 공급 안정성 측정 지표가 아닙니다.',
      },
      {
        id: 'opt-reserve',
        label: '공급예비율 (Reserve Margin)',
      },
      {
        id: 'opt-rps',
        label: '신재생에너지공급의무화 (RPS)',
        wrongReason:
          '신재생에너지공급의무화(RPS)는 대규모 발전사업자에게 일정 비율 이상의 신재생에너지 전력 공급을 의무화하는 정책 제도이며, 전력 수급 여유율 지표와는 다릅니다.',
      },
      {
        id: 'opt-baseload',
        label: '기저발전량',
        wrongReason:
          '기저발전량은 원자력·석탄 등 연료비가 저렴해 24시간 일정하게 가동되는 발전원의 생산량을 뜻하며, 공급능력과 수요 차이의 비율 지표가 아닙니다.',
      },
    ],
    correctOptionId: 'opt-reserve',
    correctExplanation:
      '공급예비율은 비상 상황에 대비한 전력 설비의 여유분을 뜻합니다. 발전기 고장이나 급격한 이상기후 수요 폭증 시 전력망의 붕괴를 막는 핵심 안전판이며, 예비율이 10% 밑으로 떨어지면 전력수급경보 단계가 순차적으로 발령될 수 있습니다.',
    highlightPhrase: '전력수급경보 단계',
    nextPreviewTitle: 'Q2. [전력수요] 피크타임 감축 기제 개념 퀴즈',
    sourceLabel: '한국전력공사 및 전력거래소 용어 표준',
    visualMeter: {
      title: '현재 전력계통 안정 마진 예시',
      statusLabel: '권장선 10% 이상 유지 중',
      demandPercent: 82,
      reservePercent: 18,
      leftCaption: '최대 전력 수요량 (82%)',
      rightCaption: '공급예비율 18% (안정)',
    },
  },
  {
    id: 'q-demand-response',
    termId: 'demand-response',
    termLabel: '수요반응 (DR)',
    category: '전력수요·예비력',
    difficulty: '기초',
    question:
      '여름·겨울철 전력 피크타임에 추가 발전소를 가동하는 대신, 공장이나 대형 건물이 자발적으로 전기 사용량을 줄이고 정산금을 지급받는 시장 기제는 무엇일까요?',
    options: [
      {
        id: 'opt-dr',
        label: '수요반응 (Demand Response, DR)',
      },
      {
        id: 'opt-curtail',
        label: '출력제어 (Curtailment)',
        wrongReason:
          '출력제어는 반대로 전력 공급이 수요보다 넘치거나 송전망이 포화될 때 발전기의 발전 출력을 강제로 낮추는 계통 보호 조치입니다.',
      },
      {
        id: 'opt-ppa',
        label: '전력직접거래 (PPA)',
        wrongReason:
          '전력직접거래(PPA)는 기업이 재생에너지 발전사업자로부터 전력을 직접 구매하는 장기 계약 방식이며, 피크타임 부하 감축 보상 제도가 아닙니다.',
      },
      {
        id: 'opt-fr',
        label: '주파수조정용 ESS',
        wrongReason:
          '주파수조정용 ESS는 배터리 충·방전으로 계통 주파수(60Hz)를 실시간 제어하는 설비이며, 전기 사용자의 자발적 절전 참여 제도와는 다릅니다.',
      },
    ],
    correctOptionId: 'opt-dr',
    correctExplanation:
      '수요반응(DR)은 피크타임에 아낀 전기를 전력시장에 되파는 "네가와트(Negawatt)" 개념의 핵심 수단입니다. 발전설비 건설 비용을 절감하고 전력수급 위기 시 단시간 내 수 GW의 부하를 낮출 수 있습니다.',
    highlightPhrase: '네가와트(Negawatt)',
    sourceLabel: '전력거래소 수요자원거래시장 운영규칙',
    visualMeter: {
      title: '피크타임 DR 발동 시 부하 감축 효과 예시',
      statusLabel: '첨두부하 2.1GW 절감',
      demandPercent: 74,
      reservePercent: 26,
      leftCaption: '감축 후 실수요 (74%)',
      rightCaption: 'DR 확보 여유 26%',
    },
  },
  {
    id: 'q-smp',
    termId: 'smp',
    termLabel: '계통한계가격 (SMP)',
    category: '전력시장·거래',
    difficulty: '기초',
    question:
      '우리나라 전력도매시장에서 시간대별로 거래되는 전력의 기준 도매가격으로서, 해당 시간 수요를 맞추기 위해 마지막에 투입된 한계발전기의 변동비로 결정되는 지표는 무엇일까요?',
    options: [
      {
        id: 'opt-rec',
        label: '신재생에너지 공급인증서 (REC)',
        wrongReason:
          'REC는 신재생에너지 발전량 1MWh당 발급되는 환경·정책 인증서 가격이며, 시간대별 전체 전력도매시장의 한계가격이 아닙니다.',
      },
      {
        id: 'opt-smp',
        label: '계통한계가격 (SMP)',
      },
      {
        id: 'opt-cfd',
        label: '차액계약 (CfD)',
        wrongReason:
          '차액계약(CfD)은 사전 약정 기준가격과 시장가격의 차이를 정산하는 계약 방식이지, 시간대별 시장 도매가격 자체를 뜻하지 않습니다.',
      },
      {
        id: 'opt-reserve',
        label: '공급예비율',
        wrongReason:
          '공급예비율은 전력 공급능력의 여유 비율을 나타내는 계통 안전 지표로, 전력 거래 가격(원/kWh)이 아닙니다.',
      },
    ],
    correctOptionId: 'opt-smp',
    correctExplanation:
      '계통한계가격(SMP)은 연료비가 싼 발전기부터 순서대로 가동한 뒤, 마지막으로 투입된 발전기(주로 LNG 복합화력)의 연료비 단가로 전 발전기에 동일하게 적용되는 도매시장 기준 가격입니다.',
    highlightPhrase: '마지막으로 투입된 발전기',
    nextPreviewTitle: 'Q2. [전력시장] 신재생 공급인증서(REC) 수익 구조 퀴즈',
    sourceLabel: '전력거래소 전력시장운영규칙',
  },
  {
    id: 'q-rec',
    termId: 'rec',
    termLabel: '신재생에너지 공급인증서 (REC)',
    category: '전력시장·거래',
    difficulty: '기초',
    question:
      '태양광·풍력 발전사업자가 전력 판매 대금(SMP) 외에 추가로 발급받아 의무이행 발전사(RPS 대상)에게 판매할 수 있는 1MWh 기준 증서는 무엇일까요?',
    options: [
      {
        id: 'opt-dr',
        label: '수요반응 자원 (DR)',
        wrongReason:
          '수요반응(DR)은 전기 소비자가 전력 소비를 줄여 보상받는 제도이며, 신재생 발전량에 따라 발급되는 인증서가 아닙니다.',
      },
      {
        id: 'opt-baseload',
        label: '기저발전 정산금',
        wrongReason:
          '기저발전은 원자력·석탄 등 상시 가동 전원을 가리키며, 신재생에너지 발전 인증 제도와는 무관합니다.',
      },
      {
        id: 'opt-rec',
        label: '신재생에너지 공급인증서 (REC)',
      },
      {
        id: 'opt-island',
        label: '계통섬 보상권',
        wrongReason:
          '계통섬은 육지 계통에서 분리된 고립 계통 상태를 뜻하는 기술 용어이며, 거래 가능한 인증서 제도가 아닙니다.',
      },
    ],
    correctOptionId: 'opt-rec',
    correctExplanation:
      'REC(Renewable Energy Certificate)는 신재생에너지 1MWh 발전 시 설비·입지별 가중치를 곱해 발급됩니다. 발전사업자의 총 매출은 전력 판매 수익(SMP)과 인증서 판매 수익(REC)의 합으로 구성됩니다.',
    highlightPhrase: 'SMP와 REC의 합',
    nextPreviewTitle: 'Q3. [전력시장] 기업 RE100 전력직접거래(PPA) 퀴즈',
    sourceLabel: '한국에너지공단 RPS 운영규칙',
  },
  {
    id: 'q-ppa',
    termId: 'ppa',
    termLabel: '전력직접거래 (PPA)',
    category: '전력시장·거래',
    difficulty: '중급',
    question:
      'RE100 이행을 추진하는 기업이 전력도매시장을 거치지 않고 재생에너지 발전사업자와 장기 계약을 체결해 전기를 직접 조달하는 거래 방식은 무엇일까요?',
    options: [
      {
        id: 'opt-ppa',
        label: '전력직접거래 (PPA)',
      },
      {
        id: 'opt-rps',
        label: '신재생에너지 공급의무화 (RPS)',
        wrongReason:
          'RPS는 대규모 발전사업자에게 신재생 공급 의무를 부과하는 정부 규제이며, 일반 기업의 직접 전력 구매 계약이 아닙니다.',
      },
      {
        id: 'opt-curtail',
        label: '출력제어 (Curtailment)',
        wrongReason:
          '출력제어는 과잉 발전 시 계통 보호를 위해 출력을 강제로 줄이는 운영 조치로, 전력 조달 계약 방식이 아닙니다.',
      },
      {
        id: 'opt-peak',
        label: '첨두부하 계약',
        wrongReason:
          '첨두부하는 특정 시간대의 최대 전력 수요 상태를 뜻하며, RE100용 장기 전력 구매 계약 제도가 아닙니다.',
      },
    ],
    correctOptionId: 'opt-ppa',
    correctExplanation:
      '전력직접거래(PPA)는 기업이 10~20년의 장기 고정가격으로 재생에너지 전력을 안정적으로 확보하면서 동시에 RE100·탄소중립 실적을 공식 인정받을 수 있는 대표적 조달 수단입니다.',
    highlightPhrase: 'RE100·탄소중립 실적',
    nextPreviewTitle: 'Q4. [전력시장] 가격 변동성 완화 차액계약(CfD) 퀴즈',
    sourceLabel: '산업통상자원부 전기사업법 시행령',
  },
  {
    id: 'q-cfd',
    termId: 'cfd',
    termLabel: '차액계약 (CfD)',
    category: '전력시장·거래',
    difficulty: '실무',
    question:
      '발전사업자와 구매자가 사전에 기준가격을 정해 두고, 실제 전력시장가격(SMP)이 기준가격보다 높거나 낮을 때 그 차이 금액만 사후 정산해 가격 급변 위험을 줄이는 계약은 무엇일까요?',
    options: [
      {
        id: 'opt-smp',
        label: '계통한계가격 현물정산',
        wrongReason:
          '현물정산은 매시간 변동하는 SMP에 그대로 노출되는 거래 방식으로, 가격 차액을 상계해 변동성을 완화하는 구조가 아닙니다.',
      },
      {
        id: 'opt-cfd',
        label: '차액계약 (Contract for Difference, CfD)',
      },
      {
        id: 'opt-pumped',
        label: '양수발전 정산제',
        wrongReason:
          '양수발전은 잉여 전력으로 물을 퍼 올려 저장하는 수력 설비이며, 전력가격 변동 헤지 계약 구조가 아닙니다.',
      },
      {
        id: 'opt-congestion',
        label: '송전제약 정산',
        wrongReason:
          '송전제약은 선로 용량 부족으로 발전이 제한될 때 발생하는 계통 현상과 관련되며, 가격 고정 차액 정산 제도가 아닙니다.',
      },
    ],
    correctOptionId: 'opt-cfd',
    correctExplanation:
      '차액계약(CfD)은 시장가격(SMP)이 급등하면 초과분을 환수해 소비자 요금 부담을 낮추고, 시장가격이 급락하면 부족분을 보전해 발전 투자의 예측 가능성을 확보하는 양방향 가격 안정화 메커니즘입니다.',
    highlightPhrase: '양방향 가격 안정화 메커니즘',
    sourceLabel: '전력거래소 전력시장 선진화 자료',
  },
  {
    id: 'q-curtailment',
    termId: 'curtailment',
    termLabel: '출력제어',
    category: '신재생·탄소중립',
    difficulty: '중급',
    question:
      '봄·가을 낮 시간대처럼 전력 수요는 적은데 태양광·풍력 발전량이 급증해 계통 주파수가 허용 범위를 벗어날 우려가 있을 때, 발전기 출력을 인위적으로 낮추는 조치는 무엇일까요?',
    options: [
      {
        id: 'opt-curtail',
        label: '출력제어 (Curtailment)',
      },
      {
        id: 'opt-dr',
        label: '수요반응 (DR)',
        wrongReason:
          '수요반응(DR)은 전력이 부족할 때 소비자의 사용량을 줄이는 제도이며, 전력이 남아돌 때 발전 출력을 낮추는 조치가 아닙니다.',
      },
      {
        id: 'opt-peak',
        label: '첨두부하 운전',
        wrongReason:
          '첨두부하 운전은 전력 수요가 최대치로 올라갔을 때 발전기를 추가 가동하는 상황으로, 과잉 발전 제한과 반대입니다.',
      },
      {
        id: 'opt-rec',
        label: '공급인증서 발급 (REC)',
        wrongReason:
          'REC는 실제 전력 생산량에 따라 발급되는 인증서로, 계통 보호를 위한 발전 출력 감축 조치와는 다릅니다.',
      },
    ],
    correctOptionId: 'opt-curtail',
    correctExplanation:
      '출력제어(Curtailment)는 공급 과잉 시 계통 주파수(60Hz) 상승과 광역 정전을 막기 위한 최후의 계통 보호 조치입니다. 최근에는 양수발전, ESS, 계통 보강 등을 통해 출력제어 발생을 최소화하려 노력하고 있습니다.',
    highlightPhrase: '광역 정전을 막기 위한 최후의 계통 보호 조치',
    nextPreviewTitle: 'Q2. [계통운영] 고립된 전력망 계통섬 현상 퀴즈',
    sourceLabel: '전력거래소 계통운영 보고서',
  },
  {
    id: 'q-islanded-grid',
    termId: 'islanded-grid',
    termLabel: '계통섬',
    category: '계통·송배전',
    difficulty: '실무',
    question:
      '송전선로 사고나 차단기 동작으로 인해 특정 지역 전력망이 육지 중앙 계통과 분리되어, 내부 발전원만으로 주파수와 전압을 홀로 유지해야 하는 고립 상태를 무엇이라 부를까요?',
    options: [
      {
        id: 'opt-baseload',
        label: '기저부하 구간',
        wrongReason:
          '기저부하는 하루 중 항상 유지되는 최소 전력 수요 수준을 의미하며, 계통이 물리적으로 분리된 상태를 뜻하지 않습니다.',
      },
      {
        id: 'opt-congestion',
        label: '송전제약 구간',
        wrongReason:
          '송전제약은 선로가 연결된 상태에서 전송 용량이 포화되어 전력을 다 보내지 못하는 현상이며, 계통이 완전히 단절된 상태와는 구별됩니다.',
      },
      {
        id: 'opt-island',
        label: '계통섬 (Islanded Grid)',
      },
      {
        id: 'opt-rps',
        label: '신재생 특구',
        wrongReason:
          '신재생 특구는 정책적 산업·실증 구역을 뜻하며, 전력계통공학상의 고립 운전 상태를 가리키는 용어가 아닙니다.',
      },
    ],
    correctOptionId: 'opt-island',
    correctExplanation:
      '계통섬(Islanded Grid) 상태가 되면 외부 계통의 관성과 예비력 도움을 받을 수 없어 작은 수급 불균형에도 주파수가 급변하게 됩니다. 따라서 보호계전 협조와 빠른 주파수조정 자원이 필수적입니다.',
    highlightPhrase: '보호계전 협조와 빠른 주파수조정 자원',
    nextPreviewTitle: 'Q3. [계통운영] 송전선로 용량 포화 송전제약 퀴즈',
    sourceLabel: '한국전력공사 송변전 실무 지침',
  },
  {
    id: 'q-transmission-congestion',
    termId: 'transmission-congestion',
    termLabel: '송전제약',
    category: '계통·송배전',
    difficulty: '실무',
    question:
      '동해안이나 호남권의 발전소에서 생산한 값싼 전기를 수도권 수요지까지 보낼 송전선로 용량이 부족해, 값싼 발전기 출력을 줄이고 수요지 인근의 비싼 발전기를 돌려야 하는 현상은 무엇일까요?',
    options: [
      {
        id: 'opt-congestion',
        label: '송전제약 (Transmission Congestion)',
      },
      {
        id: 'opt-reserve',
        label: '공급예비율 부족',
        wrongReason:
          '전국 총 발전 설비 용량이 충분하더라도 지역 간 선로 용량이 막혀 전기를 못 보내는 것은 설비 총량 부족이 아닌 송전망 병목 문제입니다.',
      },
      {
        id: 'opt-dr',
        label: '수요반응 발동',
        wrongReason:
          '수요반응은 소비 측의 자발적 절전 참여 기제이며, 송전망 용량 부족으로 인한 발전 제약 현상이 아닙니다.',
      },
      {
        id: 'opt-ppa',
        label: '전력직접거래 (PPA)',
        wrongReason:
          'PPA는 발전사와 기업 간 전력 구매 계약 형태를 의미하며, 계통 선로의 전송 병목 현상이 아닙니다.',
      },
    ],
    correctOptionId: 'opt-congestion',
    correctExplanation:
      '송전제약(송전혼잡)은 발전설비 입지와 전력 소비지가 지역적으로 불균형할 때 발생하는 대표적 병목 현상입니다. HVDC 초고압 송전선로 확충과 분산에너지 활성화가 근본 해법으로 추진됩니다.',
    highlightPhrase: 'HVDC 초고압 송전선로 확충과 분산에너지 활성화',
    nextPreviewTitle: 'Q4. [계통운영] 대규모 물 배터리 양수발전 퀴즈',
    sourceLabel: '전력거래소 전력계통 운영 실무',
  },
  {
    id: 'q-pumped-storage',
    termId: 'pumped-storage',
    termLabel: '양수발전',
    category: '계통·송배전',
    difficulty: '중급',
    question:
      '태양광 발전이 넘치는 낮이나 심야에 남는 전기로 물을 상부 저수지로 퍼 올렸다가, 피크 시간대에 물을 떨어뜨려 몇 분 만에 전력을 생산하는 "거대한 물 배터리" 설비는 무엇일까요?',
    options: [
      {
        id: 'opt-baseload',
        label: '기저 석탄화력발전',
        wrongReason:
          '석탄화력은 기동 및 출력 조절에 수 시간이 걸려 빠른 피크 대응이나 잉여 전력 저장용으로 활용하기 어렵습니다.',
      },
      {
        id: 'opt-pumped',
        label: '양수발전 (Pumped-storage)',
      },
      {
        id: 'opt-cfd',
        label: '차액계약 발전',
        wrongReason:
          '차액계약(CfD)은 전력 정산·계약 방식의 이름이지, 위치 에너지를 활용해 전력을 저장·생산하는 물리적 발전 설비가 아닙니다.',
      },
      {
        id: 'opt-rps',
        label: 'RPS 의무발전',
        wrongReason:
          'RPS는 신재생에너지 의무 비율 제도를 뜻하며, 양수저장 기능을 수행하는 특정 발전 설비 명칭이 아닙니다.',
      },
    ],
    correctOptionId: 'opt-pumped',
    correctExplanation:
      '양수발전은 전기를 물의 위치 에너지 형태로 대용량 저장할 수 있고, 지시 후 3~5분 이내에 최대 출력에 도달할 수 있어 재생에너지 출력제어 완화와 피크 대응에 모두 핵심적인 역할을 합니다.',
    highlightPhrase: '3~5분 이내에 최대 출력에 도달',
    sourceLabel: '한국수력원자력 발전기술 자료',
  },
  {
    id: 'q-distributed-energy',
    termId: 'distributed-energy',
    termLabel: '분산에너지',
    category: '신재생·탄소중립',
    difficulty: '중급',
    question:
      '원거리 초대형 발전소와 초고압 송전망 의존도를 낮추고, 전력이 소비되는 지역 인근에서 소규모 발전·저장 자원으로 직접 생산·소비(지산지소)하는 체계를 무엇이라 할까요?',
    options: [
      {
        id: 'opt-distributed',
        label: '분산에너지 (Distributed Energy)',
      },
      {
        id: 'opt-baseload',
        label: '기저발전 집중망',
        wrongReason:
          '기저발전 집중망은 원전·석탄 등 대규모 중앙집중형 전원에 의존하는 전통적 공급 방식을 뜻하며, 지산지소 개념과 반대입니다.',
      },
      {
        id: 'opt-smp',
        label: '계통한계가격 통합망',
        wrongReason:
          '계통한계가격(SMP)은 도매 전력 가격 산정 방식이며, 수요지 인근 소규모 생산·소비 체계가 아닙니다.',
      },
      {
        id: 'opt-peak',
        label: '첨두부하 집중제',
        wrongReason:
          '첨두부하는 전력 수요의 최고치 시점을 뜻하는 용어로, 분산형 전원 체계와는 다릅니다.',
      },
    ],
    correctOptionId: 'opt-distributed',
    correctExplanation:
      '분산에너지 활성화 특별법 시행으로 수요지 인근 소규모 발전, ESS, 통합발전소(VPP) 확대와 지역별 차등 요금제·전력계통영향평가 도입이 가속화되고 있습니다.',
    highlightPhrase: '지역별 차등 요금제·전력계통영향평가',
    nextPreviewTitle: 'Q2. [탄소중립] 신재생에너지 공급의무화(RPS) 퀴즈',
    sourceLabel: '산업통상자원부 분산에너지 활성화 특별법',
  },
  {
    id: 'q-fr-ess',
    termId: 'fr-ess',
    termLabel: '주파수조정용 ESS',
    category: '계통·송배전',
    difficulty: '실무',
    question:
      '국내 전력계통 표준 주파수(60Hz)가 수급 불균형으로 흔들릴 때 0.2초 이내의 초고속 충·방전으로 주파수를 즉시 붙잡아 주는 계통 안정화 설비는 무엇일까요?',
    options: [
      {
        id: 'opt-fr',
        label: '주파수조정용 ESS',
      },
      {
        id: 'opt-basic',
        label: '전력수급기본계획',
        wrongReason:
          '전력수급기본계획은 15년 단위의 국가 중장기 정책 계획 문서이며, 실시간 주파수를 제어하는 물리적 설비가 아닙니다.',
      },
      {
        id: 'opt-ppa',
        label: '전력직접거래 (PPA)',
        wrongReason:
          'PPA는 기업과 발전사업자 간의 전력 구매 계약으로, 밀리초 단위의 계통 주파수 제어 설비가 아닙니다.',
      },
      {
        id: 'opt-rec',
        label: '공급인증서 (REC)',
        wrongReason:
          'REC는 신재생 발전량 인증서이며, 변전소 등에서 주파수 안정화를 수행하는 저장장치가 아닙니다.',
      },
    ],
    correctOptionId: 'opt-fr',
    correctExplanation:
      '주파수조정용 ESS는 기존 화력발전기가 담당하던 주파수 추종 역할을 배터리 기반 인버터의 밀리초 단위 속응성으로 대체·보완해, 재생에너지 비중이 커지는 계통에서도 60Hz 품질을 지킵니다.',
    highlightPhrase: '밀리초 단위 속응성',
    sourceLabel: '한국전력공사 계통계획처',
  },
  {
    id: 'q-rps',
    termId: 'rps',
    termLabel: '신재생에너지 공급의무화 (RPS)',
    category: '신재생·탄소중립',
    difficulty: '기초',
    question:
      '500MW 이상의 발전설비를 보유한 대형 발전사업자에게 총 발전량의 일정 비율 이상을 신재생에너지로 공급하도록 의무화한 제도는 무엇일까요?',
    options: [
      {
        id: 'opt-rps',
        label: '신재생에너지 공급의무화 (RPS)',
      },
      {
        id: 'opt-smp',
        label: '계통한계가격 상한제 (SMP)',
        wrongReason:
          '계통한계가격(SMP)은 전력도매시장 가격 결정 기준이며, 대규모 발전사에 신재생에너지 공급 비율을 의무화하는 제도가 아닙니다.',
      },
      {
        id: 'opt-dr',
        label: '수요반응 거래제도 (DR)',
        wrongReason:
          '수요반응(DR)은 전기 소비자가 피크 시간대 전력 사용을 줄이고 보상받는 제도이지, 발전사업자 대상 신재생 의무 비율 제도가 아닙니다.',
      },
      {
        id: 'opt-island',
        label: '계통섬 독립운영제',
        wrongReason:
          '계통섬은 중앙 전력망에서 분리된 고립 계통 상태를 의미하는 기술 용어이며, 신재생 공급 의무 정책 제도가 아닙니다.',
      },
    ],
    correctOptionId: 'opt-rps',
    correctExplanation:
      '신재생에너지 공급의무화(RPS) 대상 발전사는 자체 신재생 설비를 구축하거나, 외부 신재생 발전사업자가 발급받은 공급인증서(REC)를 구매해 연간 의무 공급 비율을 이행해야 합니다.',
    highlightPhrase: '연간 의무 공급 비율',
    sourceLabel: '한국에너지공단 신재생에너지센터',
  },
  {
    id: 'q-baseload',
    termId: 'baseload',
    termLabel: '기저발전량',
    category: '계통·송배전',
    difficulty: '기초',
    question:
      '하루 24시간 중 항상 유지되는 최소 전력 수요를 담당하며, 연료비가 저렴해 연중 대부분 일정한 출력으로 가동되는 원자력·석탄 등의 발전량을 무엇이라 할까요?',
    options: [
      {
        id: 'opt-peak',
        label: '첨두부하 발전량',
        wrongReason:
          '첨두부하 발전량은 전력 소비가 가장 높은 피크 시간대에 일시적으로 추가 가동하는 LNG·양수발전 등을 가리키며, 24시간 상시 가동되는 기저발전과 반대 성격입니다.',
      },
      {
        id: 'opt-baseload',
        label: '기저발전량 (Base Load)',
      },
      {
        id: 'opt-curtail',
        label: '출력제어 감축량',
        wrongReason:
          '출력제어는 공급 과잉 시 발전 출력을 강제로 줄이는 계통 보호 조치의 감축량으로, 상시 바닥 수요를 맡는 발전량이 아닙니다.',
      },
      {
        id: 'opt-ppa',
        label: '직접전력거래량 (PPA)',
        wrongReason:
          'PPA는 기업과 재생에너지 발전사 간 직접 전력 구매 계약 물량을 뜻하며, 24시간 상시 가동 전원 개념과는 다릅니다.',
      },
    ],
    correctOptionId: 'opt-baseload',
    correctExplanation:
      '기저발전량은 변동비(연료비)가 저렴해 경제급전 원칙에 따라 가장 먼저 투입되는 전원들의 발전량입니다. 출력 조절 속도는 느리지만 안정적이고 저렴한 전력 공급의 토대 역할을 합니다.',
    highlightPhrase: '경제급전 원칙',
    sourceLabel: '한국전력공사 전력용어집',
  },
  {
    id: 'q-peak-load',
    termId: 'peak-load',
    termLabel: '첨두부하',
    category: '전력수요·예비력',
    difficulty: '기초',
    question:
      '한여름 오후 냉방 수요나 한겨울 난방 수요가 몰려 하루 또는 계절 중 전력 소비가 가장 높게 치솟는 시간대의 최대 전력 수요를 뜻하는 용어는 무엇일까요?',
    options: [
      {
        id: 'opt-baseload',
        label: '기저부하 (Base Load)',
        wrongReason:
          '기저부하는 하루 중 최저 수준으로 항상 유지되는 바닥 수요를 의미하므로, 최고치로 치솟는 최대 수요와 정반대 개념입니다.',
      },
      {
        id: 'opt-reserve',
        label: '공급예비력 (Reserve Power)',
        wrongReason:
          '공급예비력은 전체 공급능력에서 현재 전력수요를 뺀 여유 발전 용량을 뜻하며, 수요 자체의 최고점을 가리키는 말이 아닙니다.',
      },
      {
        id: 'opt-peak',
        label: '첨두부하 (Peak Load)',
      },
      {
        id: 'opt-congestion',
        label: '송전제약 (Transmission Congestion)',
        wrongReason:
          '송전제약은 송전선로 용량이 부족해 전력을 충분히 보내지 못하는 망 병목 현상을 의미합니다.',
      },
    ],
    correctOptionId: 'opt-peak',
    correctExplanation:
      '첨두부하(피크부하) 시점에도 정전이 발생하지 않도록 전력당국은 기동 속도가 빠른 LNG 복합화력, 양수발전, 수요반응(DR) 자원을 집중 배치해 수급 균형을 맞춥니다.',
    highlightPhrase: '수급 균형',
    sourceLabel: '전력거래소 계통운영 기준',
  },
  {
    id: 'q-basic-plan',
    termId: 'basic-plan',
    termLabel: '전력수급기본계획',
    category: '전력수요·예비력',
    difficulty: '중급',
    question:
      '전기사업법에 따라 산업통상자원부가 2년 주기로 수립하며, 향후 15년간의 전력 수요 전망, 적정 설비예비율, 전원 믹스 및 송변전 설비 계획을 담는 국가 최상위 계획은 무엇일까요?',
    options: [
      {
        id: 'opt-basic',
        label: '전력수급기본계획 (전기본)',
      },
      {
        id: 'opt-cfd',
        label: '차액계약 기본협약 (CfD)',
        wrongReason:
          '차액계약(CfD)은 발전사와 구매자 간 전력가격 변동 위험을 줄이기 위한 정산 계약 방식이며, 15년 단위 국가 전력 마스터플랜이 아닙니다.',
      },
      {
        id: 'opt-rec',
        label: '신재생 공급인증서 계획 (REC)',
        wrongReason:
          'REC는 신재생 발전량에 따라 발급되는 인증서 제도로, 국가 전체의 중장기 전원 구성과 송변전 계획을 총괄하는 계획이 아닙니다.',
      },
      {
        id: 'opt-fr',
        label: '주파수조정 운영계획 (FR)',
        wrongReason:
          '주파수조정은 60Hz 계통 품질을 실시간으로 유지하는 단기 계통 제어 영역이며, 15년 중장기 국가 계획이 아닙니다.',
      },
    ],
    correctOptionId: 'opt-basic',
    correctExplanation:
      '전력수급기본계획(전기본)은 AI 데이터센터, 첨단 산업단지 등 미래 전력 수요 증가 요인을 반영해 적정 예비율을 유지할 발전·송전 인프라 건설 로드맵을 확정하는 핵심 정책 문서입니다.',
    highlightPhrase: '발전·송전 인프라 건설 로드맵',
    sourceLabel: '산업통상자원부 전력정책관실',
  },
];

export const QUIZ_TRACKS: QuizTrack[] = [
  {
    id: 'detected-default',
    title: '검출 용어 기반 맞춤 퀴즈',
    subtitle: '핵심 전력·에너지 용어 10문항 종합 학습',
    badgeLabel: '검출 용어 기반 맞춤 퀴즈',
    questionIds: [
      'q-reserve-margin',
      'q-demand-response',
      'q-smp',
      'q-rec',
      'q-rps',
      'q-baseload',
      'q-peak-load',
      'q-pumped-storage',
      'q-curtailment',
      'q-ppa',
    ],
  },
  {
    id: 'market-track',
    title: '전력시장 & 가격 메커니즘',
    subtitle: 'SMP · REC · PPA · CfD 거래 구조 완전 정복',
    badgeLabel: '전력시장 핵심 마스터 트랙',
    questionIds: ['q-smp', 'q-rec', 'q-ppa', 'q-cfd'],
  },
  {
    id: 'grid-stability',
    title: '전력계통 & 수급 안정성',
    subtitle: '출력제어 · 계통섬 · 송전제약 · 양수발전 실무',
    badgeLabel: '전력계통 실무 집중 퀴즈',
    questionIds: ['q-curtailment', 'q-islanded-grid', 'q-transmission-congestion', 'q-pumped-storage'],
  },
  {
    id: 'renewables-track',
    title: '신재생 & 분산에너지 기초',
    subtitle: '분산에너지 · 주파수조정 ESS · 전기본 · RPS 종합',
    badgeLabel: '신재생·분산에너지 트랙',
    questionIds: ['q-distributed-energy', 'q-fr-ess', 'q-basic-plan', 'q-rps'],
  },
];

export const NEWS_SAMPLES: NewsSample[] = [
  {
    id: 'summer-grid',
    title: '올여름 최대전력 97.2GW 전망… 공급예비율 10% 이상 사수 총력',
    source: '에너지데일리 브리핑',
    date: '2026.07',
    body: '산업통상자원부는 본격적인 폭염으로 첨두부하가 급증할 경우에도 발전설비 정비를 조기 마무리해 안정적인 공급예비율을 유지할 계획이다. 만약 이상기후로 수요가 예상을 웃돌면 산업체 참여형 수요반응(DR)을 즉시 발동하고, 기동이 빠른 양수발전과 주파수조정용 ESS를 총동원해 계통 안정을 도모할 방침이다.',
  },
  {
    id: 'market-smp-rec',
    title: 'LNG 가격 안정에 SMP 하향… 기업 RE100용 직접 PPA 체결 확대',
    source: '전력경제 리포트',
    date: '2026.09',
    body: '국제 천연가스 가격 진정으로 전력도매시장의 계통한계가격(SMP)이 완만히 하락하는 반면, 수출 기업들의 RE100 수요가 늘면서 전력직접거래(PPA)와 신재생에너지 공급인증서(REC) 장기계약 시장이 활기를 띠고 있다. 정부는 도매가격 급변을 완화하기 위해 차액계약(CfD) 제도 적용 범위도 함께 검토 중이다.',
  },
  {
    id: 'curtailment-der',
    title: '봄철 경부하기 출력제어 증가… 송전제약 해소와 분산에너지 해법 부상',
    source: '계통기술 저널',
    date: '2026.05',
    body: '태양광 발전량이 몰리는 주말 낮 시간대에는 기저발전량 비중이 높은 상태에서 송전제약까지 겹쳐 불가피한 출력제어가 늘고 있다. 일시적 분리 시 계통섬 위험을 낮추기 위해 변전소 연계 주파수조정용 ESS 보강과 지역 자급형 분산에너지 특화 모델 구축이 핵심 과제로 꼽힌다.',
  },
];
