Live Deployment link - https://thomasgonda3.github.io/Chess-ThomasG/

Completed Goals -

- Square of selected piece is highlighted

- Every square you can possibly move to is highlighted with a circle

- Every Piece can move and capture each other correctly

- Castling implemented

- En Passant implemented

- Notation implemented

- Prevent player from moving king into Check and castling through Check

- Prevent player from making a move that reveals their king to check.

- Check and Checkmate

To-Do list -  

- Pawn Promotion

- Add a move number to the notation on the right. e.g. 1) e4 e5 2) Nf3 Nc6

- Correctly Identify origin square when two of same piece can move to one square when writing notation.  e.g. Rook on a1 and h1, Rook on h1 moves to f1 even though both can move there.  Correct notation is Rhf1, but currently is Rf1 with no specification.

Stretch Goal list -

- Drag and drop pieces

- Implement a clock

- Improve CSS of notation box on the right

- Make Chess Board shrink and grow with page size

Bugs -

- Pieces can't move digonally or vertically onto a8 

- Incorrectly states checkmate when the only move to escape checkmate is capturing the piece checking them.

- Incorrectly states checkmate when the only move is to run the king to a square that was controlled by the attacker on the previous turn, but is now being blocked by the piece checking the king.
