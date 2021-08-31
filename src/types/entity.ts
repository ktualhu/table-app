export default interface IEntity {
  id: number;
  parentId: number;
  isActive: boolean;
  balance: string;
  name: string;
  email: string;
  children: IEntity[];
  show: boolean;
}
