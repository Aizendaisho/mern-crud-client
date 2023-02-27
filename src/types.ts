
export type Posts = {
  _id: string;
  title: string;
  description: string;
  image?: Image;
};

interface Image {
    public_id: string;
    url: string;
}