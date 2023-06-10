enum CommonROLE {
  USER = "USER",
  PB = "PB",
  ADMIN = "ADMIN",
}

enum Propensity {
  CONSERVATIVE = "CONSERVATIVE",
  CAUTIOUS = "CAUTIOUS",
  BALANCED = "BALANCED",
  AGGRESSIVE = "AGGRESSIVE",
  SPECULATIVE = "SPECULATIVE",
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
  METICULOUS = "METICULOUS",
  KIND = "KIND",
  PROFESSIONAL = "PROFESSIONAL",
  FAST = "FAST",
  HONEST = "HONEST",
  PRAGMATIC = "PRAGMATIC",
  DIRECTIONAL = "DIRECTIONAL",
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

export {
  CommonROLE,
  Propensity,
  PBSpecialty,
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
};
