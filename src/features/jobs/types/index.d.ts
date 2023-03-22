type NewFormTypes = {
  position: string;
  description: string;
  scope: "full_time" | "part_time";
  start_date: Date;
  end_date: Date;
  city: string;
  location: "on_site" | "remote" | "hybrid";
  tags: string[];
};
