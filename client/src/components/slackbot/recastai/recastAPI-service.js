import { RECAST_API_URL, RECAST_APP_TOKEN } from '../constants/constants';

const recastAPIservice = cmdEntered => new Promise((resolve, reject) => {
  fetch(RECAST_API_URL + cmdEntered, {
    method: 'post',
    headers: {
      Authorization: `Token ${RECAST_APP_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    res.json().then((data) => {
      resolve(data.results);
    });
  }).catch((err) => {
    // reject(Error("There is error in resolving name of repository from sentence..."));
    reject(err);
    console.log(err, 'There is error in resolving name of repository from sentence...');
  });
});

export { recastAPIservice };
