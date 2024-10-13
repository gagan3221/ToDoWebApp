import { Router } from "express";
import {
  create,
  updateSingleNote,
  removeSingleNote,
  readAll,
  readSingleNote,
} from "../controllers/note";

const router = Router();

router.post("/create", create);
router.patch("/:noteId", updateSingleNote);
router.delete("/:noteId", removeSingleNote);
router.get("/", readAll);
router.get("/:id", readSingleNote);

export default router;
