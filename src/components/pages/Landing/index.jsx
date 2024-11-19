import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
//import {decodeBase64} from '../../../utils/decodeBase64.js';

/**
 * TODO: Ticket 1:
 * Implement structure and styles of the Landing page using Tailwind
 * Implement any button functionality implied by the landing page screenshot example (tickets/examples)
 */

export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20; // Adjust the divisor for speed
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10); // Adjust the interval time for smoothness
  };

  const handleReadMore = () => {
    // TODO: navigate to the humanrightsfirst.org homepage
    window.location.href = 'https://humanrightsfirst.org/';
  };

  return (
    <div className='flex-c w-[100vw] secondary-c'>

      <section class='flex primary-c pt-4 pb-8'>
        <div class='flex-c mx-auto'>
          <h1 class='text-6xl mb-8 text-white'>Asylum Office Grant Rate Tracker</h1>
          <h3 class='text-white'>
            The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on
            Asylum Office decisions
          </h3>
        </div>
      </section>

      <section class='graphs-section flex-c pt-10'>
        <div class='flex-c'>
          <div class='flex justify-center m-14 gap-20 text-2xl'>
            <div class='flex-c gap-3'>
              <img src={barGraph} alt='bargraph' class='h-[300px] w-[500px]' />
              <h3>Search Grant Rates By Office</h3>
            </div>
            <div class='flex-c gap-3'>
              <img src={pieChart} alt='piechart' class='h-[300px] contain-content' />
              <h3>Search Grant Rates by Nationality</h3>
            </div>
            <div class='flex-c gap-3'>
              <img src={lineGraph} alt='linegraph' class='h-[300px] w-[500px]' />
              <h3>Search Grant Rates Over Time</h3>
            </div>
          </div>
          <div class='flex align-center mx-auto gap-8'>
            <button class='bg-[#aaa] px-[10px] py-[5px] text-white text-md font-semibold' onClick={() => navigate('/graphs')}>
              View the Data
            </button>
            <button class='bg-[#aaa] px-[10px] py-[5px] text-white text-md font-semibold' onClick={downloadCSV}>
              Download the Data
            </button>
          </div>
        </div>
      </section>

      <section class='middle-section flex'>
        <div class='flex-1 hrf-img-container content-center p-20'>
          <img src={paperStack} alt='Human Rights First' class='hrf-img rounded-2xl h-[70%] w-[100%]' />
        </div>
        <div class='middle-section-text-container flex-1 content-center p-20'>
          <p class='text-xl'>
            Human Rights First has created a search tool to give you a user-friendly way to explore a data set of asylum decisions between FY 2016 and May 2021
            by the USCIS Asylum Office, which we received through a Freedom of Information Act request. You can search for information on asylum grant rates by
            year, nationality, and asylum office, visualize the data with charts and heat maps, and download the data set.
          </p>
        </div>
      </section>

      <section class='insights-section flex-c gap-16'>
        <div class='insights-section-header'>
          <h3 class='text-5xl'>Systematic Disparity Insights</h3>
        </div>
        <div class='insights-section-details flex justify-center m-14 gap-20 text-2xl'>
          <div class='flex-c-1 gap-12'>
            <div class='insights-details-header'>
              <h3 class='text-4xl'>36%</h3>
            </div>
            <div class='insights-details-content'>
              <p class='text-lg'>
                By the end of the Trump administration, the average asylum office grant rate had fallen 36% from an average of 44 percent in fiscal year 2016 to
                28 percent in fiscal year 2020.
              </p>
            </div>
          </div>
          <div class='flex-c-1 gap-12'>
            <div class='insights-details-header'>
              <h3 class='text-4xl'>5%</h3>
            </div>
            <div class='insights-details-content'>
              <p class='text-lg'>The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.</p>
            </div>
          </div>
          <div class='flex-c-1 gap-12'>
            <div class='insights-details-header'>
              <h3 class='text-4xl'>6X Lower</h3>
            </div>
            <div class='insights-details-content'>
              <p class='text-lg'>
                Between fiscal year 2017 and 2020, the New York asylum office's average grant rate was 6 times lower than the San Francisco asylum office.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class='read-more-section'>
        <button class='primary-c text-white px-4 py-2' onClick={handleReadMore}>
          Read More
        </button>
      </section>

      <section class='back-to-top p-16'>
        <button class='back-to-top font-medium' onClick={scrollToTop}>
          Back To Top ^
        </button>
      </section>
    </div>
  );
};
