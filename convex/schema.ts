import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
  })
  .index("by_owner_id", ["ownerId"])
  .searchIndex("search_title",{
    searchField: "title",
    filterFields: ["ownerId"],
  }),
});
