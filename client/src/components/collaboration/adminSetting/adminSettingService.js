import { database } from '../userSetting/userSettingService';

function fnCreateChannel(channelName, channelType, channelId) {
  const channelN = document.getElementById('channelName').value;
  const channelT = document.getElementById('channelType').value;
  const channelI = document.getElementById('channelId').value;
  const channelref = database.ref('team001/channels/');
  channelref.set({
    channelId: channelI,
    channelName: channelN,
    private: channelT,
  }, (error) => {
    if (error) {
      console.log(error, 'There is error while saving data into firebase...');
    } else {
      console.log('channel created successfully...');
    }
  });
}

document.getElementById('createChannel').addEventListener('click', fnCreateChannel);


export { fnCreateChannel };
