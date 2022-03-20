function get_timestamp() {
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hour = date_ob.getHours();
  let min = date_ob.getMinutes();
  let sec = date_ob.getSeconds();

  // prints date & time in YYYY-MM-DD format
  return year + '-' + month + '-' + date + '  ' + hour + ':' + min + ':' + sec;
}

module.exports = { get_timestamp };
