import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirpreferenceComponent } from './voirpreference.component';

describe('VoirpreferenceComponent', () => {
  let component: VoirpreferenceComponent;
  let fixture: ComponentFixture<VoirpreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoirpreferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoirpreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
