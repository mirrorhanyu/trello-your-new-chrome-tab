import moment from 'moment';

const simpleFormat = 'MMDDYYYYHHmm';

const currentTime = () => {
  return moment().format(simpleFormat);
};

const formatTime = (time) => {
  return moment(time, simpleFormat).format('DD MMM YYYY [at] HH:mm');
};

export {
  currentTime,
  formatTime
}