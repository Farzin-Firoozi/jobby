import api from './api.service'
import { jobRoutes } from './routes'

const jobs = {
  all: (params: Object) => api.get(jobRoutes.all, params),
  one: (id: number) => api.get(jobRoutes.jobDetail(id)),
}

const res = { jobs }

export default res
