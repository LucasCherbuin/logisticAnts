import { ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import { ArticleCommandeComponent } from 'src/app/component/articleCommande.component';

describe('ArticleCommandeComponent', () => {
  let component: ArticleCommandeComponent;
  let fixture: ComponentFixture<ArticleCommandeComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCommandeComponent ]
    })
    .compileComponents();
  });

    beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 