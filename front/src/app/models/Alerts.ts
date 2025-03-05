export interface Alert {
  type: string;
  title: string;
  content:string;
  isHtmlContent?: boolean;
}

export interface ConfirmAlert {
  type: string;
  title: string;
  content:string;
  isHtmlContent?: boolean;
  confirm: () => void;
  cancel?: () => void;
}
