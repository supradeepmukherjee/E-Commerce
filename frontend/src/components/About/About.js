import { useEffect } from 'react'
import { Avatar, Typography } from '@mui/material'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import './About.css'

const About = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    return (
        <div className='about'>
            <div className="aboutContainer">
                <Typography component={'h1'}>
                    About Us
                </Typography>
                <div className="">
                    <div className="">
                        <Avatar src='https://avatars.githubusercontent.com/u/113124882?v=4' alt='Founder' style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }} />
                        <Typography>
                            <b>
                                Supradeep Mukherjee
                            </b>
                        </Typography>
                        <br />
                        <span>
                            This is an eCommerce Website made by <b>Supradeep Mukherjee</b> using MERN stack. I have given my best efforts in building this and I hope that you will like this.
                        </span>
                    </div>
                    <div className="aboutContainer2">
                        <Typography component={'h2'}>
                            Find me on
                        </Typography>
                        <a href="https://github.com/supradeepmukherjee" target='_' alt='GitHub'>
                            <GitHub className='github' />
                        </a>
                        <a href="https://www.linkedin.com/in/supradeep-mukherjee" target='_' alt='LinkedIn'>
                            <LinkedIn className='linkedin' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About