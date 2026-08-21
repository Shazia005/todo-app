import videoBg from '../images/Chillhop - White Oak.mp4';

const Background = () => {
  return (
    <div className="video fixed inset-0 z-0">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        src={videoBg} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default Background;