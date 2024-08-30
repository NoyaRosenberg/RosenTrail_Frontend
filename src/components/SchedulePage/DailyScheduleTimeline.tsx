import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent, timelineOppositeContentClasses,
    TimelineSeparator
} from "@mui/lab";
import {Card, CardContent, Typography} from "@mui/material";

import AttractionsIcon from '@mui/icons-material/Attractions';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MuseumIcon from '@mui/icons-material/Museum';

const DailyScheduleTimeline = () => {
    return (
        <Timeline
                  sx={{
                      [`& .${timelineOppositeContentClasses.root}`]: {
                          flex: 0.2,
                      },
                  }}>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                    9:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Card sx={{display: 'flex', backgroundColor: '#f5f5f5', borderRadius: 2}}>
                        <CardContent sx={{height: '100%'}}>
                            <Typography variant="h6" component="span">
                                Eat
                            </Typography>
                            <Typography>Breakfast at a local patisserie</Typography>
                        </CardContent>
                    </Card>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{m: 'auto 0'}}
                    variant="body2"
                    color="text.secondary"
                >
                    10:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary">
                        <AttractionsIcon/>
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Card sx={{display: 'flex', backgroundColor: '#f5f5f5', borderRadius: 2}}>
                        <CardContent sx={{height: '100%'}}>
                            <Typography variant="h6" component="span">
                                Eiffel Tower
                            </Typography>
                            <Typography>Because it&apos;s awesome!</Typography>
                        </CardContent>
                    </Card>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{m: 'auto 0'}}
                    variant="body2"
                    color="text.secondary"
                >
                    11:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="outlined">
                        <MuseumIcon/>
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Card sx={{display: 'flex', backgroundColor: '#f5f5f5', borderRadius: 2}}>
                        <CardContent sx={{height: '100%'}}>
                            <Typography variant="h6" component="span">
                                Louvre Museum
                            </Typography>
                            <Typography>One of the most famous museums in the world</Typography>
                        </CardContent>
                    </Card>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{m: 'auto 0'}}
                    variant="body2"
                    color="text.secondary"
                >
                    13:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                    <TimelineDot color="secondary">
                        <AttractionsIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Card sx={{display: 'flex', backgroundColor: '#f5f5f5', borderRadius: 2}}>
                        <CardContent sx={{height: '100%'}}>
                            <Typography variant="h6" component="span">
                                Park
                            </Typography>
                            <Typography>A walk in the park</Typography>
                        </CardContent>
                    </Card>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}

export default DailyScheduleTimeline;