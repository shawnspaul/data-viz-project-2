import { Box, Typography } from '@mui/material';
import * as React from 'react';
import logo from './Picture1.png';
import logo1 from './Picture2.png';

const Documentation = () => {

    return(
        <Box sx={{ width: '100%', maxWidth: 1500 }}>
            <Typography variant="h2" gutterBottom>
            Documentation
            </Typography>
            <Typography variant="h4" gutterBottom>
            <Box sx={{fontWeight: 'bold'}}>
            Topic Detection & Analysis of Twitter Data using an Imposed Network Structure
            </Box>
            </Typography>
            <Typography variant="h6" gutterBottom>
            <Box sx={{mb: 7}}> The Network Structure implicitly defines our focus group (Tele-Critical Care) which has been tailored to be representative of the public discourse surrounding the broadly defined topic. </Box>
            </Typography>
            <Typography variant="h5" gutterBottom>
            Project Context & Scope:
            </Typography>

            <Typography variant="body1" gutterBottom>
            The dashboard provided serves as one arm of a ‘Social Media Machine’ - an application currently under research and development with the Crisis Technologies Innovation Lab. The dashboard aims to allow the user to browse/surf twitter data that have been collected around a particular focus group (Tele-Critical Care/Tele-Health) with more agency than might be possible on the Twitter platform. 

The focus group has been selected such that we might assume that the summation of their tweets is representative of the public discourse surrounding the particular topic the focus group was chosen to represent. The focus group selection process is completed through the use of a simple evolutionary algorithm that iterates towards more highly connected users within the Twitter network.

Ultimately, we have imposed additional structure onto the data to allow for new visualizations such as the restricted network graph where we see the users have been categorized into different modularity groups. This additional structure 
            </Typography>
            
            <Box sx={{mb: 5}}></Box>
           

            <Typography variant="h5" gutterBottom>
            The Design Process:
            </Typography>

            <Typography variant="body1" gutterBottom>
            The design process was very iterative in nature. We started out by going through the spreadsheets and getting an understanding of the data so that we could decide what excel data we want to use and convert to JSON to be used in the application. We then had to decide how that data would be stored and accessed. After converting the excel docs to JSON objects, we decided to store them as JSON files in the web project directory. For accessing data, we created a series of selectors using the react recoil state management library.

After getting the data accessible in the web app, we created some data tables to look at the data a little bit more and started creating some components to interact with selecting and unselecting modularity groups and using those modularity group filters on the users list and tweets list. 

Once we got more comfortable with interacting with the data and the overall concept of how we would want to answer certain questions, we decided that a network graph would be useful and created that network graph. We had to iterate on the display options in the network graph in order help understand and visualize the impact of certain users and interconnectivity between groups. From there we wanted to learn more, so we created the ranks page where you can sort by different attributes (followers, tweets, etc.) so that we could select a user from the network graph and learn more about that user and understand who their connected to and more details about their profile that could have an impact on understanding their influence.

The Word Cloud page was the last page we added. We added this because we wanted to visualize how participants from different modularity groups were falling into these topics with other groups.

After going through the questions we wanted to answer again, we found areas of the web app that could use improvement, better visibility for key data points, and looked for ways to improve on and remove visual noise that would distract a user from seeing what we want to convey. We also wanted to make sure that components within the web app were more interconnected.


            </Typography>
            
            <Box sx={{mb: 5}}></Box>

            <Typography variant="h5" gutterBottom>
            Question:
            </Typography>

            
            <Typography variant="body1" gutterBottom>
            <Box sx={{ fontWeight: 'bold',mb: 2 }}>Are certain locations within the network likely to increase Followers per day? </Box>
            
By extension is a Luminary’s position within the network likely to have an effect on the ability for a tweet to propagate (via retweets)?

In order to investigate this question we can look at the Emergency Medicine modularity group as their neighborhood is disconnected from the rest of the network. We can see there is a large variance in # of followers based on the few members of the group

            <Box sx={{ fontWeight: 'bold',mt: 2 }}>Does follower count depend on how active the account is (tweets per day)?</Box>
            <Box sx={{ fontWeight: 'bold',mb: 2 }}>Is network position or activity level more important to propagate information?</Box>

There does seem to be some correlation between follower count and tweets per day. As you can see, Emergency Medicine has the lowest size representing followers and also has little to no activity when looking at tweets per day. The same can not be said for the rest of the industries. Each one has a noticeable tweets per day to circle size association with Technology and Media & Marketing being the highest in both graphical representations.
            </Typography>
            <Box sx={{mb: 5}}></Box>
            <img src={logo} alt="logo" />{"\n"}
            <Box sx={{mb: 5}}></Box>
            <Typography variant="body1" gutterBottom>
It also seems network position has an impact on disrupting data. Media & marketing are an example of this due to the fact most of the largest accounts are found in this category when it comes to tweets per day.      
            
            </Typography>
            <Box sx={{mb: 5}}></Box>

            <img src={logo1} alt="logo"/>{"\n"}
            <Box sx={{mb: 5}}></Box>
            <Box sx={{ fontWeight: 'bold',mb: 2 }}>How do the top Tele-Health companies advertise themselves in user bios? What improvements can be made to lesser companies/interest groups to have the same effect on their media presence?</Box> 
            
            <Typography variant="body1" gutterBottom>
            First, in this context we might take the luminaries with the most followers to be the ‘top’ members. An approach through the main dashboard and the network graph we could note that companies are only a portion of the demographic as there are individuals (i.e. Space Bob) and events (i.e. GIANT Health Event) among other things. We might broaden the scope to include the CEO’s, likely representing corporate interests of the companies…
            Nothing about the Luminary user biographies stands out. This could be because the selection of the focus group implies that these users are ALL industry leaders, communicators, and facilitators of this public discourse. 


            </Typography>

            <Typography variant="body1" gutterBottom>

            The utility of the network graph is not immediately apparent as a ‘tweet-browsing tool’ for any concrete analysis. It is certainly a neat way to browse through the data - but is it anything more than a neat interaction?  With a focus group of approx 250 luminaries (nodes) where a luminary might have upwards of 50 followers (edges) from the focus group it quickly becomes unwieldy. 

Consider though, the intended user is receiving a new batch of tweets with a fresh analysis weekly. Our intended user likely took part in the focus group selection/determination and has been monitoring the network behavior. Over the course of a few weeks the user will become familiar with many of the luminaries and likely take advantage of the ability to ‘surf the edges’ between luminaries. It provides a mental model for the user that is less abstract than spreadsheets containing the tweet data and will ultimately result in a more intimate understanding of the (ever-increasing) dataset.

The 5 modularity groups are identified based on a topic analysis performed on the user’s bio. 
 The same topic analysis is applied to each tweet and then is lumped into those same modularity group ‘content bins’. Thus we might expect it to increase the likelihood that a particular week’s tweets content bin matches the identity (modularity group) of the tweeter. 

However, a better estimate of a particular week’s tweets content might be the composition of their followers in the network.  


            </Typography>
            <Box sx={{ fontWeight: 'bold',mt: 5,mb: 2 }}>Does the topic detection analysis utilized provide enough information to understand a topic without referring to specific tweet text? If raw tweets are needed for a coherent summarization of a topic does the visualization/analysis effectively point the user towards the appropriate data?</Box> 
            <Typography variant="body1" gutterBottom>

            We manage to create a section on our web application that allows us to analyze different topics and tweets on those topics. To access this section, we just have to select a random user and it will display a table of tweets with their Luminary Group, date and Topic. The topic column has links that lead to the section dedicated to the analysis of topics.

This page has a drop-down with the different topic numbers that display topic information with all the tweets on this topic. This page provides us with enough information such as the top words and top hashtags who gave us a broad idea of the topic, but we also have a summary part that gives more information to understand topics without referring to the specific tweet text.


            </Typography>


            <Box sx={{ fontWeight: 'bold', mt: 5,mb: 2 }}>What additional tools might be helpful in allowing the user to maintain or compare topics from one week to the next? </Box>
            <Typography variant="body1" gutterBottom>

            One tool might be allowing the user to create tags for the topics (or users). Suppose the user is supplied with a similar dataset each week. Some patterns are likely to start emerging where the user might be able to categorize topics into larger subsets that seem to occur on a weekly basis (like the latest episodes & periodic information or webinars, conferences, and summits). 

Certainly, the user will have topics or tweets that are particularly relevant or valuable. Thus an affordance where the user can favorite or collect that high-value data would be appropriate. 

The most important aspect of this mechanism would be in how the user revisits this information. Would these favorites remain accessible outside the particular week’s dataset? Could the data be used to create some sort of watchlist to help prioritize incoming Twitter data?

            </Typography>


            What are the most captivating findings from this project?
            
                Using the web application's network visualization, we attempted to find different correlations by observing the size and position of each node. We thought we could use this visualization's ability to change the size of the nodes based on various factors to conduct a data analysis on this dataset.
                After experimenting with various combinations, we discovered that there is no correlation between the tweet per day ratio and the number of followers on Twitter, but when we replaced the number of followers with the number of followers of the same focus group, we found a positive correlation. This can be explained by the fact that the contents only attract people who are interested in those topics.

            
<Box sx={{ fontWeight: 'bold', mt: 5,mb: 2 }}>
Contributions:
</Box>
<Typography variant="body1" gutterBottom>
Chika - Assembling team and meetings,Giving assignments, Analyzing data and answering document questions.
</Typography>
<Typography variant="body1" gutterBottom>
Shawn - Lead development of website, contributed to data analysis and data structuring for the project.
</Typography>
<Typography variant="body1" gutterBottom>
Joel Brauchla - Provided data and communicated its context and purpose to the design team. Contributed to data analysis and documentation as well as the design choice.
</Typography>
<Typography variant="body1" gutterBottom>
Joel-Cedric - Analyzing data to discover interesting results and responding to documentation questions. Assist with simple page like the documentation page.
</Typography>






           





        </Box>
    )
}

export default Documentation
