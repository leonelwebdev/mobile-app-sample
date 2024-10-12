import { SQLiteProvider } from "expo-sqlite"
import { Slot } from "expo-router"
import { initDb } from "@/db/initDb"
import { StatusBar } from "expo-status-bar"

export default function Layout() {
  return (
    <SQLiteProvider databaseName="train.db" onInit={initDb}>
      <StatusBar style="dark" animated hideTransitionAnimation="slide" />
      <Slot />
    </SQLiteProvider>
  )
}
