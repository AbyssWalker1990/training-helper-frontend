import { API_HOST } from "./config";

class TrainingService {
  constructor (public host: string) {
    this.host = host
  }

  public async getUserTrainings(username: string): Promise<Training[]> {
    const response = await fetch(`${API_HOST}trainings/user`)
    const trainingsList: Promise<Training[]> = response.json()
    return trainingsList
  }
}

export default TrainingService