package com.example.procurement.controller;

import com.example.procurement.model.Part;
import com.example.procurement.service.PartService;
import com.example.procurement.service.SupplierService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@CrossOrigin(origins = "http://localhost:3000")
public class PartController {

    private final PartService partService;
    private final SupplierService supplierService;

    public PartController(PartService partService, SupplierService supplierService) {
        this.partService = partService;
        this.supplierService = supplierService;
    }

    @GetMapping
    public List<Part> getAllParts() {
        return partService.getAllParts();
    }

    @PostMapping
    public Part createPart(@RequestBody Part part) {
        return partService.savePart(part);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePart(@PathVariable Long id) {
        partService.deletePart(id);
        return ResponseEntity.noContent().build();
    }
}