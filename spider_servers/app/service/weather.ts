import BaseService from './baseService';

// tslint:disable-next-line:no-multi-spaces
class  WeatherService extends BaseService {
  async getWeather() {
    const weather = await this.fetch('http://api.k780.com?app=weather.today&weaid=1&appkey=48296&sign=c5d265ef3fca8f7132f1654d0c0f92f1&format=json', {});
    return JSON.parse(weather.toString());
  }
}
export default WeatherService;
