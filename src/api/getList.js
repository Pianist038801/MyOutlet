export const getList = function getList(type, userid) {
  return fetch(`http://mypatchv3.com/MyOutlet/OutletServices.svc/GetOutletList/${type}/${userid}`,
  {
    method: 'GET'
  }
  )
  .then((response) => response.json())
  .then( function(dat){
    console.log(dat.GetOutletListResult);
    console.log('_____________');
    return dat.GetOutletListResult;
  });
}
export const getVersion = (os, version) => {
  return fetch(`http://mypatchv3.com/MyOutlet/OutletServices.svc/CheckUpdate/1002/${os}/${version}`,
  {
    method: 'GET'
  }
  )
  .then((response) => response.json())
  .then( function(dat){
    return dat.CheckUpdateResult;
  });
}
export const getLogin = (userid, password, uid) => {
  return fetch(`http://mypatchv3.com/MyOutlet/OutletServices.svc/VerifyLogin/${userid}/${password}/${uid}`,
  {
    method: 'GET'
  }
  )
  .then((response) => response.json())
  .then( function(dat){
    return dat.VerifyLoginResult;
  });
}