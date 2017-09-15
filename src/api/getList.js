export default  apiPostCall = function getList() {
  return fetch('http://mypatchv3.com/MyOutlet/OutletServices.svc/GetOutletList/TE/V2KX201', 
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