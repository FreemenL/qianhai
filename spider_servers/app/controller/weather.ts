import BaseController from './base';

class WeatherController extends BaseController {
  async index() {
    const { ctx } = this;
    try {
      const watcher = await ctx.service.weather.getWeather();
      this.success(watcher);
    } catch (error) {
      this.error(error);
    }
  }
}

export default WeatherController;
