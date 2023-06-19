import { useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";

export interface IItem {
  id: number;
  time: number;
  by: string;
  title: string;
  url: string;
}

export default function StoryItem({ id, by, title, url, time }: IItem) {
  const timestamp = useMemo<string>(
    () => String(new Date(time * 1000)),
    [time]
  );

  return (
    <Card sx={{ my: 2 }}>
      <CardActionArea LinkComponent={Link} href={url} target="_blank">
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            @{by}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
            {timestamp}
          </Typography>
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
