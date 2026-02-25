"""
LaTeX Test - Verificare rendering matematic
"""
from manim import *

class LatexTest(Scene):
    def construct(self):
        # Titlu
        title = Text("LaTeX Test", font_size=48)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Formule matematice - FARA $ in MathTex!
        formulas = [
            r"E = mc^2",
            r"\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}",
            r"\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}",
            r"\phi = \frac{1 + \sqrt{5}}{2}",
            r"e^{i\pi} + 1 = 0",
        ]
        
        mobjects = [MathTex(formula, font_size=36) for formula in formulas]
        group = VGroup(*mobjects).arrange(DOWN, buff=0.5)
        
        self.play(FadeIn(group, shift=UP))
        self.wait(2)
        
        # Fade out
        self.play(FadeOut(group), FadeOut(title))