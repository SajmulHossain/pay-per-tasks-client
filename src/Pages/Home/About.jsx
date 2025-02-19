import Lottie from 'lottie-react';
import Heading from '../../components/Heading';
import aboutLottie from '../../assets/lotties/about.json'

const About = () => {
  return (
    <section className="section">
      <Heading heading="About Us" />

      <div className="flex items-center">
        <div>
          <Lottie animationData={aboutLottie} />
        </div>
        <p className='flex-1 text-xl'>
          Pay Per Tasks is a Micro-Task and Earning Platform that allows users
          to complete small tasks and earn money. The platform includes three
          distinct roles: Worker, Buyer, and Admin, each with specific
          functionalities to ensure seamless task management, task creation, and
          platform administration.
        </p>
      </div>
    </section>
  );
};

export default About;