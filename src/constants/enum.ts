enum CommonROLE {
  USER = "USER",
  PB = "PB",
  ADMIN = "ADMIN",
}

enum Propensity {
  CONSERVATIVE = "안전형",
  CAUTIOUS = "안전추구형",
  BALANCED = "중립형",
  AGGRESSIVE = "적극투자형",
  SPECULATIVE = "공격투자형",
}

enum RiskRating {
  VERY_LOW = "매우 낮은 위험",
  LOW = "낮은 위험",
  MIDDLE = "보통 위험",
  HIGH = "다수 높은 위험",
  VERY_HIGH = "높은 위험",
  SUPER_HIGH = "매우 높은 위험",
}

enum PBSpecialty {
  KOREAN_STOCK = "KOREAN_STOCK",
  US_STOCK = "US_STOCK",
  DERIVATIVE = "DERIVATIVE",
  FUND = "FUND",
  ETF = "ETF",
  REAL_ESTATE = "REAL_ESTATE",
  BOND = "BOND",
  WRAP = "WRAP",
}

enum PBStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

enum Admin {}

enum ReservationProcess {
  APPLY = "APPLY",
  CONFIRM = "CONFIRM",
  COMPLETE = "COMPLETE",
}

enum ReservationGoal {
  PROFIT = "PROFIT",
  RISK = "RISK",
  TAX = "TAX",
  PRESERVATION = "PRESERVATION",
}

enum ReservationType {
  VISIT = "VISIT",
  CALL = "CALL",
}

enum ReservationStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CANCEL = "CANCEL",
}

enum ReservationLocationType {
  BRANCH = "BRANCH",
  CALL = "CALL",
}

enum ConsultationStyle {
  METICULOUS = "꼼꼼한",
  KIND = "친절한",
  PROFESSIONAL = "노련한",
  FAST = "빠른",
  HONEST = "솔직한",
  PRAGMATIC = "현실적인",
  DIRECTIONAL = "방향 제시",
}

enum BoardStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  TEMP = "TEMP",
}

enum Adherence {
  BAD = "BAD",
  NORMAL = "NORMAL",
  EXCELLENT = "EXCELLENT",
}

enum UserBookmark {}
enum PBBookmark {}
enum BoardBookmark {}
enum Notice {}
enum FrequentQuestion {}

enum QuestionAuthorRole {
  USER = "USER",
  PB = "PB",
}

enum Answer {}
enum AgreementType {
  REQUIRED = "REQUIRED",
  OPTIONAL = "OPTIONAL",
}

enum Career {}
enum Award {}
enum Branch {}
enum Company {}

enum InputFormType {
  LOGIN = "LOGIN",
  FIND_EMAIL = "FIND_EMAIL",
  FIND_PASSWORD = "FIND_PASSWORD",
}

enum JoinFormType {
  EMAIL = "EMAIL",
  NAME = "NAME",
  PHONENUMBER = "PHONENUMBER",
}

export {
  CommonROLE,
  Propensity,
  PBSpecialty,
  RiskRating,
  PBStatus,
  Admin,
  ReservationProcess,
  ReservationGoal,
  ReservationType,
  ReservationStatus,
  ReservationLocationType,
  ConsultationStyle,
  BoardStatus,
  Adherence,
  UserBookmark,
  PBBookmark,
  BoardBookmark,
  Notice,
  FrequentQuestion,
  QuestionAuthorRole,
  Answer,
  AgreementType,
  Career,
  Award,
  Branch,
  Company,
  InputFormType,
  JoinFormType,
};
