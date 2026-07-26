import { pgTable, serial, text, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const signalsTable = pgTable("signals", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  finalSignal: text("final_signal").notNull(), // BUY | SELL | NONE
  confidence: real("confidence").notNull().default(0),
  macroSignal: text("macro_signal").notNull().default("NEUTRAL"),
  orderbookSignal: text("orderbook_signal").notNull().default("NEUTRAL"),
  earningsSignal: text("earnings_signal").notNull().default("NEUTRAL"),
  technicalSignal: text("technical_signal").notNull().default("NEUTRAL"),
  score: real("score"),
  sentToTradingView: boolean("sent_to_trading_view").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSignalSchema = createInsertSchema(signalsTable).omit({ id: true, createdAt: true });
export type InsertSignal = z.infer<typeof insertSignalSchema>;
export type Signal = typeof signalsTable.$inferSelect;
