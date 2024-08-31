import { Grid, Skeleton } from "@mui/material";
import React from "react";

export interface CardsSkeletonProps {
    numInRow: number
}

const CardsSkeleton = ({ numInRow }: CardsSkeletonProps) => {
    return (
        <Grid container spacing={2}>
            {Array.from({ length: numInRow * 2 }).map((_, index) => (
              <Grid item xs={12 / numInRow} key={index} sx={{ display: "flex" }}>
                <Skeleton animation="wave" variant="rectangular" width="100%" height={200} sx={{ borderRadius: "8px" }}/>
              </Grid>
            ))}
        </Grid>
    );
}

export default CardsSkeleton;