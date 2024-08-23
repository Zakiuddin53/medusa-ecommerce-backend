import { BaseEntity } from "@medusajs/medusa";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class CustomTheme extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column("jsonb")
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    headerFooter: string;
    background: string;
    foreground: string;
    cardBackground: string;
    cardForeground: string;
  };
}
