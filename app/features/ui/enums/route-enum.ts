export enum RouteEnum {
  ROOT = '/',

  // ACCOUNT
  ACCOUNT = '/app/account',
  ACCOUNT_INFORMATION = '/app/account/information',
  ACCOUNT_HISTORY = '/app/account/history',

  // ADMIN
  ADMIN = '/app/admin',
  ADMIN_USERS = '/app/admin/users',
  ADMIN_QUESTIONS = '/app/admin/questions',
  ADMIN_QUESTION_TAGS = '/app/admin/question-tags',

  // MEETINGS
  MEETINGS = '/app/meetings',
  MY_MEETINGS = '/app/meetings/my-meetings',
  MEETING_CREATE = '/app/meetings/my-meetings/create',
  MEETING_DETAILS = 'details',
  MEETING_EXTRACT = 'extract',
  MEETING_MATCHES = 'matches',
  MEETING_REFEREES = 'referees',

  // MINIMAL_SKILLS
  MINIMAL_SKILLS = '/app/minimal-skills',
  MINIMAL_SKILLS_RESULTS = '/app/minimal-skills/results',

  // AUTH
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',

  // USERS
  CREATE_USER = '/api/users/create',
  SEARCH_USERS = '/api/users/search',
}
