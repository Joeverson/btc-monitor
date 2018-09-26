from tkinter import *
import requests

# pegando os dados da cotaçaõ do BTC
r = requests.get("https://blockchain.info/ticker")

root = Tk()
root.geometry("300x300")
w = Label(root, text=r.json()['USD']['last'], fg="black", bg="white")
w.pack()


root.mainloop()
