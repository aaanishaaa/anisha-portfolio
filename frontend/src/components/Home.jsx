import wallpaper from '../assets/wallpaper.png'
import Clock from './Clock'
import Panel from './Panel'

function Home() {
    return (
        <>
            
            <div
                style={{
                    backgroundImage: `url(${wallpaper})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '92vh',
                }}
            >
                <div className='grid grid-cols-5 gap-2 p-5'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div><Clock/></div>
                </div>
            </div>
            <div>
            <Panel/>
            </div>
        </>
    )
}

export default Home
