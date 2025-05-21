import GeneratedContentDisplay from "@/app/components/dashboard/createCards"


const Page = () => {
    return (
        <div>
            <GeneratedContentDisplay numCards={4} promptTitle="Create a pack of cards with cat dressed as karate kid" imageUrls={["/Kids.jpg", "/Kids.jpg", "/Kids.jpg", "/Kids4.jpg", "/Kids5.jpg"]} />
        </div>
    )
}

export default Page;
