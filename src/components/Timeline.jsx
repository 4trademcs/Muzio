import DomeGallery from './reactBits/DomeGallery';
import TextType from './reactBits/TextType';

export default function App() {
  return (
    <section className='mt-20 mb-24'>
      <div className="text-center my-14 px-6">
        <TextType
          text={["Desde que llegaste", "Cambió mi mundo", "Happy Birthday!"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-3xl md:text-5xl font-bold tracking-wide"
        />
      </div>

      <div id='noConfetti' style={{ width: '100vw', height: '60vh' }}>
        <DomeGallery 
          minRadius={300}
          segments={15}
          maxVerticalRotationDeg={20}
          fit={0.1}
          grayscale={false}
          autoSpin={true}   
          spinDegPerSec={8} 
        />
      </div>
    </section>
  );
}
