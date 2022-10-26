interface dataLSP3Profile {
  name: string;
  description: string;
  tags: Array<string>;
  profileImage: Array<{}>;
}

export interface dataUP {
  LSP3Profile: dataLSP3Profile;
}
