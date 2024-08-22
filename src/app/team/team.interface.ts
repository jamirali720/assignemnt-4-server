export interface ITeam {
    _id: string;
    name: string;
    role: string;
    image: {
        url: string;
        public_id: string;
    }
}