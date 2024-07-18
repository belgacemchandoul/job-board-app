export type Job = {
  id?: string,
  title: string,
  description: string,
  status: boolean,
  missions: {
    mission: string,
  }[],
  skills: {
    skill: string
  }[]
}