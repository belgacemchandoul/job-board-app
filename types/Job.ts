export type Job = {
  id?: string,
  title: string,
  description: string,
  status: boolean,
  missions: {
    aa: string
  }[],
  profiles: {
    aa: string
  }[]
}