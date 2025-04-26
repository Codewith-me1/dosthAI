import Card from "./components/Card"



function Page(){
  return(<>
  <h1>Hello </h1>
  <Card title="h" imagePath="/dummyimage.jpg" likes={12}  views={12} rating={12} creator="BCBA"/>
  </>)
}

export default Page