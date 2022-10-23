interface jsonData {
  name: string;
  description: string;
  tags: Array<string>;
  profileImage: Array<{}>;
}

export interface jsonType {
  LSP3Profile: jsonData;
}
