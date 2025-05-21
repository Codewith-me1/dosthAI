import StoryPlayer from "./Video";

import story_json from "@/public/story_json.json";

const page = ()=>{
return(
    <div className="flex flex-col h-screen">
        <StoryPlayer story={story_json.story} title='asd' />
    </div>
)


}

export default page;