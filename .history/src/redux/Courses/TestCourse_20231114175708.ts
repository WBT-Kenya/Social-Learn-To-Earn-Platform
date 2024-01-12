import axios from "axios";


const getCourses = () => {
    const basicAuth = `Basic ${btoa(`${username}:{`)}`;
    let config: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://cors-anywhere.herokuapp.com/https://awow3.talentlms.com/api/v1/courses/',
      headers: {
        Authorization: basicAuth,
      }
    };

    axios.request(config)
      .then((response: any) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error: any) => {
        console.log(error);
      });

  }