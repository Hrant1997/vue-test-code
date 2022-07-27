import Profile from '../modeles/Profile'
import AbstractRepository from './AbstractRepository'

export default class ProfileRepository extends AbstractRepository {
  constructor () {
    super(Profile, 'profiles')
  }
}
