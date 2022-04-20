import axios from 'axios'

export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem('zf-city'));
  if (!localCity) {
    return new Promise((resolve, reject) => {
      const curCity = new window.BMapGL.LocalCity();
      curCity.get(async res => {
        try {
          const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
          localStorage.setItem('zf-city', JSON.stringify(result.data.body));
          resolve(result.data.body);
        } catch (error) {
          reject(error); // 获取定位城市失败
        }
      })
    })
  } else {
    return Promise.resolve(localCity);
  }
}
