import wallpaper from '../assets/wallpaper.png'
import Panel from './Panel'
import Window from './Window'
function Home() {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0">
                <Window/>
            </div>
            <div className="flex-shrink-0 h-auto">
                <Panel/>
            </div>
        </div>
    )
}

export default Home
