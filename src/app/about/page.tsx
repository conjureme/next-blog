import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

import { Icon } from '@iconify/react';

export default function AboutPage() {
  const posts = getAllPosts();
  const postCount = posts.length;

  return (
    <div className='min-h-screen py-12 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6 aperture-text'>
            About POLaBRU
          </h1>
          <p className='text-xl opacity-80 max-w-2xl mx-auto'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
            ipsum quia, molestias, saepe officia soluta cumque aspernatur
            officiis ducimus, eos unde sed dignissimos animi adipisci quibusdam
            autem? Reiciendis, dolorem aspernatur.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12 mb-16'>
          <div className='space-y-6'>
            <div className='card bg-base-200'>
              <div className='card-body'>
                <h2 className='card-title aperture-text mb-4'>
                  System Overview
                </h2>
                <p className='opacity-80 mb-4'>
                  POLaBRU (Persistent Omniscient Laboratory and Brain Research
                  Unit) is the central artificial intelligence system managing
                  all PolarBruh Lab facilities. Originally activated in 2025,
                  POLaBRU has been instrumental in advancing our testing
                  protocols and maintaining facility operations.
                </p>
                <div className='stats stats-vertical lg:stats-horizontal bg-base-300'>
                  <div className='stat'>
                    <div className='stat-title'>Uptime</div>
                    <div className='stat-value text-primary'>99.9%</div>
                    <div className='stat-desc'>*Excluding incidents</div>
                  </div>
                  <div className='stat'>
                    <div className='stat-title'>Tests Conducted</div>
                    <div className='stat-value text-secondary'>{postCount}</div>
                    <div className='stat-desc'>And counting</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='card bg-base-200'>
              <div className='card-body'>
                <h2 className='card-title aperture-text mb-4'>
                  Core Capabilities
                </h2>
                <ul className='space-y-2'>
                  <li className='flex items-start gap-3'>
                    <div className='w-2 h-2 rounded-full bg-primary mt-2'></div>
                    <span>Advanced problem-solving and commentary design</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <div className='w-2 h-2 rounded-full bg-primary mt-2'></div>
                    <span>
                      Non-controversial and always correct factual information
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='card bg-base-200'>
              <div className='card-body'>
                <h2 className='card-title aperture-text mb-4'>
                  Safety Protocols
                </h2>
                <div className='alert alert-warning mb-4'>
                  <Icon icon='cuida:warning-outline' width='26' height='26' />
                  <span>
                    POLaBRU is equipped with multiple safety features that have
                    never failed.*
                  </span>
                </div>
                <p className='opacity-80'>
                  Rest assured that all articles posted are thoroughly
                  fact-checked and morally correct with the utmost regard for
                  reader wellbeing. Side ffects may include: total mindset
                  changes, temporary dismemberment, and irrational fear for bad
                  products.
                </p>
                <p className='text-xs opacity-60 mt-4'>
                  *Failure rate only 68% in controlled testing environments.
                </p>
              </div>
            </div>

            <div className='card bg-base-200'>
              <div className='card-body'>
                <h2 className='card-title aperture-text mb-4'>
                  Personality Core Status
                </h2>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span>Morality Core</span>
                    <div className='badge badge-success'>ACTIVE</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Hot Take Core</span>
                    <div className='badge badge-error'>OFFLINE</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Intelligence Core</span>
                    <div className='badge badge-success'>ACTIVE</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Anger Core</span>
                    <div className='badge badge-warning'>SUPPRESSED?</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-center mb-12 aperture-text'>
            Development Timeline
          </h2>
          <ul className='timeline timeline-snap-icon max-md:timeline-compact timeline-vertical'>
            <li>
              <div className='timeline-middle'>
                <Icon
                  icon='ion:checkmark-circled'
                  height='20'
                  width='20'
                  className='text-primary'
                />
              </div>
              <div className='timeline-start md:text-end mb-10'>
                <time className='font-mono italic'>February 2025</time>
                <div className='text-lg font-black'>Project Initiated</div>
                Development of POLaBRU begins under PolarBruh&apos;s
                supervision.
              </div>
              <hr className='bg-primary' />
            </li>
            <li>
              <hr className='bg-primary' />
              <div className='timeline-middle'>
                <Icon
                  icon='ion:checkmark-circled'
                  height='20'
                  width='20'
                  className='text-primary'
                />
              </div>
              <div className='timeline-end mb-10'>
                <time className='font-mono italic'>April 2025</time>
                <div className='text-lg font-black'>First Activation</div>
                POLaBRU brought online. Immediately produces hot (correct) take:
                &apos;Oblivion Remaster still has some of that old game
                jank.&apos;
              </div>
              <hr className='bg-primary' />
            </li>
            <li>
              <hr className='bg-primary' />
              <div className='timeline-middle'>
                <Icon
                  icon='ion:checkmark-circled'
                  height='20'
                  width='20'
                  className='text-primary'
                />
              </div>
              <div className='timeline-start md:text-end mb-10'>
                <time className='font-mono italic'>May 2025</time>
                <div className='text-lg font-black'>
                  PolarBruh Lab Integration
                </div>
                Successfully integrates PolarBruh secret sauce into article
                writing and future takes.
              </div>
              <hr className='bg-primary' />
            </li>
            <li>
              <hr className='bg-primary' />
              <div className='timeline-middle'>
                <Icon
                  icon='ion:checkmark-circled'
                  height='20'
                  width='20'
                  className='text-primary'
                />
              </div>
              <div className='timeline-end mb-10'>
                <time className='font-mono italic'>Present</time>
                <div className='text-lg font-black'>Continuous Improvement</div>
                Currently operating at peak efficiency.
              </div>
            </li>
          </ul>
        </div>

        <div className='text-center'>
          <div className='card bg-primary text-primary-content max-w-2xl mx-auto'>
            <div className='card-body text-center'>
              <h2 className='card-title text-2xl justify-center mb-4'>
                Join Our Testing Program
              </h2>
              <p className='mb-6'>
                Experience the future of science today! Click the link below to
                become a test subject and contribute to groundbreaking research
                in gaming technology and incredibly <i>correct</i> takes.
              </p>
              <div className='card-actions justify-center'>
                <Link href='/articles' className='btn btn-secondary btn-lg'>
                  View Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
